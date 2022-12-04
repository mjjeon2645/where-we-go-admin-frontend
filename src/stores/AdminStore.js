/* eslint-disable class-methods-use-this */
import { adminApiService } from '../services/AdminApiService';
import Store from './Store';

export default class AdminStore extends Store {
  constructor() {
    super();

    this.adminId = '';
    this.errorMessage = '';
  }

  async adminLogin({ id, password }) {
    try {
      const { accessToken, adminId } = await adminApiService.login({ id, password });
      this.adminId = adminId;
      this.publish();

      return accessToken;
    } catch (error) {
      const message = error.response.data;
      return '';
    }
  }
}

export const adminStore = new AdminStore();
