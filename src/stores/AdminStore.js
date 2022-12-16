/* eslint-disable class-methods-use-this */
import { adminApiService } from '../services/AdminApiService';
import Store from './Store';

export default class AdminStore extends Store {
  constructor() {
    super();

    this.admin = {};

    this.adminId = '';
    this.employeeIdentificationNumber = 0;
    this.profileImageUrl = '';

    this.signUpState = '';
    this.errorMessage = '';
  }

  async adminLogin({ id, password }) {
    try {
      const data = await adminApiService.login({ id, password });
      this.adminId = data.socialLoginId;
      this.employeeIdentificationNumber = data.employeeIdentificationNumber;
      this.publish();
      this.clearError();

      return data.accessToken;
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;
      this.publish();

      return '';
    }
  }

  // async adminSignUp({
  //   name, adminId, employeeIdentificationNumber, password,
  // }) {
  //   try {
  //     const data = await adminApiService.signUp({
  //       name, adminId, employeeIdentificationNumber, password,
  //     }, this.profileImageUrl);

  //     this.clearError();

  //     return data;
  //   } catch (error) {
  //     const { message } = error.response.data;
  //     if (message === '이미 어드민 권한을 가진 사원입니다. 로그인을 진행해주세요') {
  //       this.changeSignUpState('exist', { errorMessage: message });
  //     }

  //     if (message === '이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요') {
  //       this.changeSignUpState('duplicated', { errorMessage: message });
  //     }

  //     return '';
  //   }
  // }

  async fetchAdmin() {
    try {
      const admin = await adminApiService.fetchAdmin();
      this.admin = admin;
      this.adminId = admin.socialLoginId;
      this.employeeIdentificationNumber = admin.employeeIdentificationNumber;
      this.publish();

      return admin;
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;
      this.publish();

      return '';
    }
  }

  async uploadProfileImage(imageFile) {
    const profileImageUrl = await adminApiService.upload(imageFile);

    this.profileImageUrl = profileImageUrl;

    this.publish();
  }

  changeSignUpState(state, { errorMessage = '' } = {}) {
    this.signUpState = state;
    this.errorMessage = errorMessage;
    this.publish();
  }

  clearError() {
    this.signUpState = '';
    this.errorMessage = '';
  }

  get isAdminAlreadyExist() {
    return this.signUpState === 'exist';
  }

  get isAdminIdDuplicated() {
    return this.signUpState === 'duplicated';
  }
}

export const adminStore = new AdminStore();
