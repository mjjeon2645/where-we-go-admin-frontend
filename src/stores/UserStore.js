import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.allUserReviews = [];
    this.userReview = {};
  }

  async fetchAllUserReviews() {
    const allUserReviews = await userApiService.fetchAllUserReviews();
    this.allUserReviews = allUserReviews;
    this.publish();
  }
}

export const userStore = new UserStore();
