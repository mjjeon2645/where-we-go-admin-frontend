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

    this.errorMessage = '';
  }

  async fetchAllUsers() {
    try {
      const users = await userApiService.fetchAllUsers();
      this.users = users;
      this.publish();

      return users;
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;

      return '';
    }
  }

  async fetchSelectedUser(id) {
    try {
      const {
        bookmarkedPlaces, children, userDto: user,
      } = await userApiService.fetchSelectedUser(id);

      this.user = user;
      this.children = children;
      this.bookmarks = bookmarkedPlaces;

      this.publish();

      return bookmarkedPlaces;
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;

      if (message.startsWith('Missing') || message.startsWith('접근')) {
        return 'authentication error';
      }

      return '';
    }
  }

  async deleteSelectedUser(userId) {
    await userApiService.deleteUser(userId);
    this.publish();
  }
}

export const userStore = new UserStore();
