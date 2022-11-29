import Store from './Store';

export default class PlaceStore extends Store {
  constructor() {
    super();

    this.places = [];
  }

  async fetchPlaces() {
    const data = await placeApiService.fetchPlaces();
    this.places = data;
    this.publish();
  }
}

export const placeStore = new PlaceStore();
