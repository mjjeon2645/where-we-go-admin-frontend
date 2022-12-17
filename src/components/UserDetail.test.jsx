// TODO. 리팩터링 필요?

import { fireEvent, render, screen } from '@testing-library/react';

import UserDetail from './UserDetail';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let errorMessage;

const deleteSelectedUser = jest.fn();
const clearDeleteState = jest.fn();
const clearError = jest.fn();
const setDeleteReason = jest.fn();
const setAdminPassword = jest.fn();

jest.mock('../hooks/useUserStore', () => () => ({
  errorMessage,
  deleteSelectedUser,
  clearDeleteState,
  clearError,
  setDeleteReason,
  setAdminPassword,
}));

const context = describe;

let user;
let userChildren;
let bookmarks;
let userReviewsFoundByUserId;
let adminId;
let employeeIdentificationNumber;

describe('UserDetail', () => {
  function renderUserDetail() {
    render(<UserDetail
      user={user}
      userChildren={userChildren}
      bookmarks={bookmarks}
      userReviews={userReviewsFoundByUserId}
      adminId={adminId}
      employeeIdentificationNumber={employeeIdentificationNumber}
    />);
  }

  context('a manager accesses user detail page', () => {
    beforeEach(() => {
      user = {
        id: 123,
        email: 'angel2645@naver.com',
        nickname: '네이버민지룽',
        socialLoginId: 'socialLoginId',
        authBy: 'naver',
        state: 'registered',
        createdAt: '2022-12-15T12:47:15.858847',
      };

      userChildren = [
        {
          id: 265, userId: 123, gender: '공주님', birthday: '2022-12-14',
        },
      ];

      bookmarks = [];
      userReviewsFoundByUserId = [];
      adminId = 'angel2645';
      employeeIdentificationNumber = 1234;
    });

    it('renders user detail', () => {
      renderUserDetail();
    });
  });

  context('there is no user information', () => {
    beforeEach(() => {
      user = {};
    });
    it('renders warning message', () => {
      renderUserDetail();

      screen.getByText('now loading...');
    });
  });
});
