/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class UserApiService {
  async fetchAllUserReviews() {
    const url = `${baseUrl}/admin-user-reviews`;
    const { data } = await axios.get(url);

    return data.userReviews;
  }
}

export const userApiService = new UserApiService();
