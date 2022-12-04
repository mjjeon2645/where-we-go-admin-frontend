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
    this.latitude = 0;
    this.longitude = 0;

    this.firstImageUrl = '';
    this.secondImageUrl = '';
    this.thirdImageUrl = '';
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

    const response = await placeApiService.addNewPlace(data, address, position, imageSource);
  }

  async deletePlace(id) {
    await placeApiService.deletePlace(id);
  }

  async uploadFirstImage(imageFile) {
    const imageUrl = await placeApiService.upload(imageFile);

    this.firstImageUrl = imageUrl;

    this.publish();
  }

  async uploadSecondImage(imageFile) {
    const imageUrl = await placeApiService.upload(imageFile);

    this.secondImageUrl = imageUrl;

    this.publish();
  }

  async uploadThirdImage(imageFile) {
    const imageUrl = await placeApiService.upload(imageFile);

    this.thirdImageUrl = imageUrl;

    this.publish();
  }
}

export const placeStore = new PlaceStore();
