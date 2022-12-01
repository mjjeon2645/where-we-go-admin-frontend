/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class PlaceApiService {
  async fetchPlaces() {
    const url = `${baseUrl}/admin-places`;
    const { data } = await axios.get(url);

    return data;
  }

  async fetchSelectedPlace(id) {
    const url = `${baseUrl}/admin-places/${id}`;
    const { data } = await axios.get(url);

    return data;
  }

  async addNewPlace(data, address, position) {
    const url = `${baseUrl}/admin-places/new`;
    const newData = { ...data, ...address, ...position };

    const response = await axios.post(url, newData);

    return response.data;
  }

  async deletePlace(id) {
    const url = `${baseUrl}/admin-places/${id}`;
    await axios.delete(url);
  }
}

export const placeApiService = new PlaceApiService();
