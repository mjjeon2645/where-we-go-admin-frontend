import { render } from '@testing-library/react';

import UserDetailPage from './UserDetailPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let user;
let userChildren;
let bookmarks;

const fetchSelectedUser = jest.fn();
const deleteSelectedUser = jest.fn();

jest.mock('../hooks/useUserStore', () => () => ({
  user,
  userChildren,
  bookmarks,
  fetchSelectedUser,
  deleteSelectedUser,
}));

let userReviewsFoundByUserId;
const fetchAllReviewsByUserId = jest.fn();

jest.mock('../hooks/useUserReviewStore', () => () => ({
  userReviewsFoundByUserId,
  fetchAllReviewsByUserId,

}));

const context = describe;

describe('UserDetailPage', () => {
  function renderUserDetailPage() {
    render(<UserDetailPage />);
  }

  context('a manager clicks user nickname in users page', () => {
    beforeEach(() => {
      user = {
        id: 155,
        nickname: '민지룽룽',
        email: 'angel2645@naver.com',
        socialLoginId: 'angel2645',
        createdAt: '2022-12-08T15:24:50.945229',
        authBy: 'kakao',
        state: 'registered',
      };

      userChildren = [
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

    it('renders user detail page', () => {
      renderUserDetailPage();

      expect(fetchSelectedUser).toBeCalled();
      expect(fetchAllReviewsByUserId).toBeCalled();
    });
  });
});
