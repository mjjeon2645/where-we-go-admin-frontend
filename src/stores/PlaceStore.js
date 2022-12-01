import { placeApiService } from '../services/PlaceApiService';
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
  }

  async fetchPlaces() {
    const { places } = await placeApiService.fetchPlaces();
    this.places = places;
    this.publish();
  }

  async fetchSelectedPlace(id) {
    const place = await placeApiService.fetchSelectedPlace(id);
    this.selectedPlace = place;
    this.publish();
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

  async requestForAddingNewPlace(data) {
    const { detailAddress } = data;
    const fullAddress = fullAddressFormater(this.roadAddress, this.jibunAddress, detailAddress);
    const address = {
      fullAddress,
      sido: this.sidoFromPostCode,
      sigungu: this.sigunguFromPostCode,
    };

    const response = await placeApiService.addNewPlace(data, address);
  }
}

export const placeStore = new PlaceStore();
