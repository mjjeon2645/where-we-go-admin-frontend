/* eslint-disable class-methods-use-this */
import { adminApiService } from '../services/AdminApiService';
import { fullAddressFormater } from '../utils/addressFormatter';

import Store from './Store';

export default class PlaceStore extends Store {
  constructor() {
    super();

    this.places = [];
    this.selectedPlace = {};

    this.roadAddress = '';
    this.jibunAddress = '';
    this.sidoFromPostCode = '';
    this.sigunguFromPostCode = '';
    this.latitude = 0;
    this.longitude = 0;

    this.firstImageUrl = '';
    this.secondImageUrl = '';
    this.thirdImageUrl = '';

    this.newPlaceState = '';
    this.errorMessage = '';

    this.reason = '';
    this.password = '';
  }

  async fetchPlaces() {
    try {
      const { places } = await adminApiService.fetchPlaces();
      this.places = places;
      this.publish();

      return places;
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;
      return '';
    }
  }

  async fetchSelectedPlace(id) {
    try {
      const place = await adminApiService.fetchSelectedPlace(id);
      this.selectedPlace = place;
      this.publish();

      return place;
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;
      this.publish();

      if (message.startsWith('Missing') || message.startsWith('접근')) {
        return 'authentication error';
      }

      return '';
    }
  }

  setRoadAddress(address) {
    this.roadAddress = address;
    this.publish();
  }

  setJibunAddress(address) {
    this.jibunAddress = address;
    this.publish();
  }

  setSido(sido) {
    this.sidoFromPostCode = sido;
    this.publish();
  }

  setSigungu(sigungu) {
    this.sigunguFromPostCode = sigungu;
    this.publish();
  }

  setLatitude(latitude) {
    this.latitude = latitude;
    this.publish();
  }

  setLongitude(longitude) {
    this.longitude = longitude;
    this.publish();
  }

  async requestForAddingNewPlace(data) {
    const { detailAddress } = data;
    const fullAddress = fullAddressFormater(this.roadAddress, this.jibunAddress, detailAddress);

    const position = {
      longitude: this.longitude,
      latitude: this.latitude,
    };

    const address = {
      fullAddress,
      sido: this.sidoFromPostCode,
      sigungu: this.sigunguFromPostCode,
    };

    const imageSource = {
      firstImage: this.firstImageUrl,
      secondImage: this.secondImageUrl,
      thirdImage: this.thirdImageUrl,
    };

    try {
      const response = await adminApiService.addNewPlace(data, address, position, imageSource);

      return response;
    } catch (error) {
      const { message } = error.response.data;
      if (message === '주소를 입력해주세요') {
        this.changeNewPlaceState('missingAddress', { errorMessage: message });
      }

      if (message === '장소 유형을 선택해주세요') {
        this.changeNewPlaceState('missingCategory', { errorMessage: message });
      }

      if (message.startsWith('Missing')) {
        this.changeNewPlaceState('missingAccessToken', { errorMessage: message });
      }
      return '';
    }
  }

  async deletePlace(id) {
    try {
      const response = await adminApiService.deletePlace(id, this.reason, this.password);

      return response;
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;
      this.publish();

      return '';
    }
  }

  async uploadFirstImage(imageFile) {
    const imageUrl = await adminApiService.upload(imageFile);

    this.firstImageUrl = imageUrl;

    this.publish();
  }

  async uploadSecondImage(imageFile) {
    const imageUrl = await adminApiService.upload(imageFile);

    this.secondImageUrl = imageUrl;

    this.publish();
  }

  async uploadThirdImage(imageFile) {
    const imageUrl = await adminApiService.upload(imageFile);

    this.thirdImageUrl = imageUrl;

    this.publish();
  }

  changeNewPlaceState(state, { errorMessage = '' } = {}) {
    this.newPlaceState = state;
    this.errorMessage = errorMessage;
    this.publish();
  }

  get isMissingAddress() {
    return this.newPlaceState === 'missingAddress';
  }

  get isMissingCategory() {
    return this.newPlaceState === 'missingCategory';
  }

  get isMissingAccessToken() {
    return this.newPlaceState === 'missingAccessToken';
  }

  clearAddPlaceState() {
    this.roadAddress = '';
    this.jibunAddress = '';
    this.sidoFromPostCode = '';
    this.sigunguFromPostCode = '';
    this.latitude = 0;
    this.longitude = 0;

    this.firstImageUrl = '';
    this.secondImageUrl = '';
    this.thirdImageUrl = '';
  }

  clearError() {
    this.newPlaceState = '';
    this.errorMessage = '';
  }

  setDeleteReason(reason) {
    this.reason = reason;
    this.publish();
  }

  setAdminPassword(password) {
    this.password = password;
    this.publish();
  }
}

export const placeStore = new PlaceStore();
