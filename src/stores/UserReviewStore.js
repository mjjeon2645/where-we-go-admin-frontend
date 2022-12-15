/* eslint-disable class-methods-use-this */
import { adminApiService } from '../services/AdminApiService';
import Store from './Store';

export default class UserReviewStore extends Store {
  constructor() {
    super();

    this.allUserReviews = [];
    this.userReview = {};

    this.userReviewsFoundByUserId = [];

    this.deleteReason = '';
    this.adminPassword = '';
    this.errorMessage = '';
  }

  async fetchAllUserReviews() {
    try {
      const allUserReviews = await adminApiService.fetchAllUserReviews();
      this.allUserReviews = allUserReviews;
      this.publish();

      return allUserReviews;
    } catch (error) {
      const { message } = error.response.data;

      this.errorMessage = message;

      if (message.startsWith('Missing') || message.startsWith('접근')) {
        return 'authentication error';
      }

      return '';
    }
  }

  async fetchSelectedReview(id) {
    try {
      const userReview = await adminApiService.selectedUserReview(id);
      this.userReview = userReview;
      this.publish();

      return userReview;
    } catch (error) {
      const { message } = error.response.data;

      this.errorMessage = message;
      this.publish();

      if (message.startsWith('Missing') || message.startsWith('접근')) {
        return 'authentication error';
      }

      return '';
    }
  }

  async deleteReview(id) {
    try {
      const data = await adminApiService
        .deleteReview(id, this.adminPassword, this.deleteReason);

      return data;
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;
      this.publish();

      return '';
    }
  }

  async fetchAllReviewsByUserId(userId) {
    const userReviewsFoundByUserId = await adminApiService.fetchAllReviewsByUserId(userId);
    this.userReviewsFoundByUserId = userReviewsFoundByUserId;
    this.publish();
  }

  setDeleteReason(text) {
    this.deleteReason = text;
    this.publish();
  }

  setAdminPassword(text) {
    this.adminPassword = text;
    this.publish();
  }

  clearDeleteState() {
    this.deleteReason = '';
    this.adminPassword = '';
    this.errorMessage = '';

    this.publish();
  }

  clearError() {
    this.errorMessage = '';
  }
}

export const userReviewStore = new UserReviewStore();
