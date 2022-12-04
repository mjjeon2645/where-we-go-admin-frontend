/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class AdminApiService {
  async login({ id, password }) {
    const url = `${baseUrl}/admin-session`;
    const { data } = await axios.post(url, { identifier: id, password });
    console.log(data);

    return data.admin;
  }
}

export const adminApiService = new AdminApiService();
