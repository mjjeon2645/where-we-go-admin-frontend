/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class UserApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchAllUsers() {
    const url = `${baseUrl}/admin-users`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.users;
  }

  async fetchSelectedUser(id) {
    const url = `${baseUrl}/admin-users/${id}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async deleteUser(id, reason, password) {
    const url = `${baseUrl}/admin-users/${id}`;
    const data = await axios.post(url, { reason, password }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    console.log(data);

    return data;
  }
}

export const userApiService = new UserApiService();
