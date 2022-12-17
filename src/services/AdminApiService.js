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

  // async signUp({
  //   name, adminId, employeeIdentificationNumber, password,
  // }, profileImageUrl) {
  //   const url = `${baseUrl}/admin-signup`;
  //   const { data } = await axios.post(url, {
  //     name,
  //     socialLoginId: adminId,
  //     employeeIdentificationNumber,
  //     password,
  //     profileImage: profileImageUrl,
  //   });

  //   return data;
  // }

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

  async fetchPlaces() {
    const url = `${baseUrl}/admin-places`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchSelectedPlace(id) {
    const url = `${baseUrl}/admin-places/${id}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async addNewPlace(inputData, address, position, imageSource) {
    const url = `${baseUrl}/admin-places/new`;
    const newData = {
      ...inputData, ...address, ...position, ...imageSource,
    };

    const { data } = await axios.post(url, newData, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async deletePlace(id, reason, password) {
    const url = `${baseUrl}/admin-places/${id}`;
    const { data } = await axios.post(url, { reason, password }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
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
    const { data } = await axios.post(url, { reason, password }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
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

  async deleteReview(id, reason, password) {
    const url = `${baseUrl}/admin-user-reviews/${id}`;
    const { data } = await axios.post(url, { reason, password }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }
}

export const adminApiService = new AdminApiService();
