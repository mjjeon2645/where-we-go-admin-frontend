/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class AdminApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async login({ id, password }) {
    const url = `${baseUrl}/admin-session`;
    const { data } = await axios.post(url, { socialLoginId: id, password });

    return data;
  }

  async signUp({
    name, adminId, employeeIdentificationNumber, password,
  }) {
    const url = `${baseUrl}/admin-signup`;
    const { data } = await axios.post(url, {
      name, socialLoginId: adminId, employeeIdentificationNumber, password,
    });

    return data;
  }

  async fetchAdmin() {
    const url = `${baseUrl}/admin-session`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    console.log(data);

    return data;
  }
}

export const adminApiService = new AdminApiService();
