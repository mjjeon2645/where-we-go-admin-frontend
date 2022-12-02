/* eslint-disable class-methods-use-this */
import { userReviewApiService } from '../services/UserReviewApiService';
import Store from './Store';

export default class UserReviewStore extends Store {
  constructor() {
    super();

    this.allUserReviews = [];
    this.userReview = {};

    this.deleteReason = '';
  }

  async fetchAllUserReviews() {
    const allUserReviews = await userReviewApiService.fetchAllUserReviews();
    this.allUserReviews = allUserReviews;
    this.publish();
  }

  async fetchSelectedReview(id) {
    const userReview = await userReviewApiService.selectedUserReview(id);
    this.userReview = userReview;
    this.publish();
  }

  async deleteReview(id) {
    await userReviewApiService.deleteReview(id);
  }

  setDeleteReason(text) {
    console.log(text);
    this.deleteReason = text;
    this.publish();
  }
}

export const userReviewStore = new UserReviewStore();
