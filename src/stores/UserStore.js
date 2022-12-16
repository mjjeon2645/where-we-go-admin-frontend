/* eslint-disable class-methods-use-this */
import { adminApiService } from '../services/AdminApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.users = [];

    this.user = {};
    this.children = [];
    this.bookmarks = [];

    this.reason = '';
    this.password = '';
    this.errorMessage = '';

    this.adminLog = {};
  }

  async fetchAllUsers() {
    try {
      const users = await adminApiService.fetchAllUsers();
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
      } = await adminApiService.fetchSelectedUser(id);

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
    try {
      const response = await adminApiService.deleteUser(userId, this.reason, this.password);
      this.adminLog = response.createdAdminLog;
      return response;
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;
      this.publish();

      return '';
    }
  }

  setDeleteReason(reason) {
    this.reason = reason;
    this.publish();
  }

  setAdminPassword(password) {
    this.password = password;
    this.publish();
  }

  clearDeleteState() {
    this.reason = '';
    this.password = '';
  }

  clearError() {
    this.errorMessage = '';
  }
}

export const userStore = new UserStore();
