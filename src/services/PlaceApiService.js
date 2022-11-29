/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class PlaceApiService {
  async fetchPlaces() {
    const url = `${baseUrl}/places`;
    const { data } = await axios.get(url);

    return data;
  }
}

export const placeApiService = new PlaceApiService();
