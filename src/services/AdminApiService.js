/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class AdminApiService {
  async login({ id, password }) {
    const url = `${baseUrl}/admin-session`;
    const { data } = await axios.post(url, { identifier: id, password });

    return data.admin;
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
}

export const adminApiService = new AdminApiService();
