/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

const { cloudinaryName, cloudinaryKey } = config;

export default class PlaceApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
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

  async addNewPlace(data, address, position, imageSource) {
    const url = `${baseUrl}/admin-places/new`;
    const newData = {
      ...data, ...address, ...position, ...imageSource,
    };

    const response = await axios.post(url, newData, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return response.data;
  }

  async deletePlace(id) {
    const url = `${baseUrl}/admin-places/${id}`;
    await axios.delete(url);
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

export const placeApiService = new PlaceApiService();
