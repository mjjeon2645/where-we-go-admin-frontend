import { placeApiService } from '../services/PlaceApiService';
import Store from './Store';

export default class PlaceStore extends Store {
  constructor() {
    super();

    this.places = [];
    this.selectedPlace = {};
  }

  async fetchPlaces() {
    const { places } = await placeApiService.fetchPlaces();
    this.places = places;
    this.publish();
  }

  async fetchSelectedPlace(id) {
    const place = await placeApiService.fetchSelectedPlace(id);
    this.selectedPlace = place;
    console.log(place);
    this.publish();
  }
}

export const placeStore = new PlaceStore();
