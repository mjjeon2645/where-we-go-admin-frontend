import { render, waitFor } from '@testing-library/react';

import UserDetailPage from './UserDetailPage';

const navigate = jest.fn();
let location;

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useLocation: () => location,
}));

let user;
let children;
let bookmarks;
let fetchSelectedUser;

jest.mock('../hooks/useUserStore', () => () => ({
  user,
  children,
  bookmarks,
  fetchSelectedUser,
}));

let userReviewsFoundByUserId;
const fetchAllReviewsByUserId = jest.fn();

jest.mock('../hooks/useUserReviewStore', () => () => ({
  userReviewsFoundByUserId,
  fetchAllReviewsByUserId,
}));

let adminId;
let employeeIdentificationNumber;
const fetchAdmin = jest.fn();

jest.mock('../hooks/useAdminStore', () => () => ({
  adminId,
  employeeIdentificationNumber,
  fetchAdmin,
}));

const context = describe;

describe('UserDetailPage', () => {
  function renderUserDetailPage() {
    render(<UserDetailPage />);
  }

  context('a manager clicks user nickname in users page', () => {
    beforeEach(() => {
      fetchSelectedUser = jest.fn(() => 'response');

      location = { pathname: '/users/155' };

      user = {
        id: 155,
        nickname: '민지룽룽',
        email: 'angel2645@naver.com',
        socialLoginId: 'angel2645',
        createdAt: '2022-12-08T15:24:50.945229',
        authBy: 'kakao',
        state: 'registered',
      };

      children = [
        { id: 1, gender: '공주님', birthday: '2021-01-03' },
        { id: 2, gender: '아직 몰라요', birthday: '2023-01-03' },
      ];

      bookmarks = [
        { placeId: 1, name: '민지네', address: '서울시 종로구' },
        { placeId: 2, name: '고래네', address: '경기도 광주시' },
        { placeId: 3, name: '콜라네', address: '강원도 원주시' },
      ];

      userReviewsFoundByUserId = [

      ];
    });

    it('renders user detail page', async () => {
      renderUserDetailPage();

      await waitFor(() => {
        expect(fetchSelectedUser).toBeCalled();
        expect(fetchAllReviewsByUserId).toBeCalledWith('155');
        expect(fetchAdmin).toBeCalled();
      });
    });
  });

  context('no authentication', () => {
    beforeEach(() => {
      fetchSelectedUser = jest.fn(() => 'authentication error');
    });

    it('calls navigate', async () => {
      renderUserDetailPage();

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/auth-error');
      });
    });
  });
});
