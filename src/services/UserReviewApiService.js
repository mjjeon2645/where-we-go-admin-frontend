/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class UserReviewApiService {
  async fetchAllUserReviews() {
    const url = `${baseUrl}/admin-user-reviews`;
    const { data } = await axios.get(url);

    return data.userReviews;
  }

  async selectedUserReview(reviewId) {
    const url = `${baseUrl}/admin-user-reviews/${reviewId}`;
    const { data } = await axios.get(url);

    return data;
  }

  async fetchAllReviewsByUserId(userId) {
    const url = `${baseUrl}/admin-user-reviews/userId/${userId}`;
    const { data } = await axios.get(url);

    return data.userReviews;
  }

  async deleteReview(id) {
    const url = `${baseUrl}/admin-user-reviews/${id}`;
    await axios.delete(url);
  }
}

export const userReviewApiService = new UserReviewApiService();
