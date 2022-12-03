/* eslint-disable class-methods-use-this */
import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.users = [];

    this.user = {};
    this.children = [];
    this.bookmarks = [];
  }

  async fetchAllUsers() {
    const users = await userApiService.fetchAllUsers();
    this.users = users;
    this.publish();
  }

  async fetchSelectedUser(id) {
    const {
      bookmarkedPlaces, children, userDto: user,
    } = await userApiService.fetchSelectedUser(id);

    this.user = user;
    this.children = children;
    this.bookmarks = bookmarkedPlaces;

    this.publish();
  }

  async deleteSelectedUser(userId) {
    await userApiService.deleteUser(userId);
    this.publish();
  }
}

export const userStore = new UserStore();
