/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class UserApiService {
  async fetchAllUsers() {
    const url = `${baseUrl}/admin-users`;
    const { data } = await axios.get(url);

    return data.users;
  }

  async fetchSelectedUser(id) {
    const url = `${baseUrl}/admin-users/${id}`;
    const { data } = await axios.get(url);

    return data;
  }

  async deleteUser(id) {
    const url = `${baseUrl}/admin-users/${id}`;
    await axios.delete(url);
  }
}

export const userApiService = new UserApiService();
