/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class UserReviewApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchAllUserReviews() {
    const url = `${baseUrl}/admin-user-reviews`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.userReviews;
  }

  async selectedUserReview(reviewId) {
    const url = `${baseUrl}/admin-user-reviews/${reviewId}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchAllReviewsByUserId(userId) {
    const url = `${baseUrl}/admin-user-reviews/userId/${userId}`;
    const { data } = await axios.get(url);

    return data.userReviews;
  }

  async deleteReview(id, password, reason) {
    const url = `${baseUrl}/admin-user-reviews/${id}`;
    const data = await axios.post(url, { password, reason }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }
}

export const userReviewApiService = new UserReviewApiService();
