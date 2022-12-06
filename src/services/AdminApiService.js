/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

const { cloudinaryName, cloudinaryKey } = config;

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
  }, profileImageUrl) {
    const url = `${baseUrl}/admin-signup`;
    const { data } = await axios.post(url, {
      name,
      socialLoginId: adminId,
      employeeIdentificationNumber,
      password,
      profileImage: profileImageUrl,
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

    return data;
  }

  async upload(imageFile) {
    const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload/`;

    const formData = new FormData();

    formData.append('api_key', cloudinaryKey);
    formData.append('upload_preset', 'wherewego');
    formData.append('timestamp', (Date.now() / 1000) || 0);
    formData.append('file', imageFile);

    const configOfUpload = {
      header: { 'Content-Type': 'multipart/form-data' },
    };

    const { data } = await axios.post(url, formData, configOfUpload);

    return data.url;
  }
}

export const adminApiService = new AdminApiService();
