import { fireEvent, render, screen } from '@testing-library/react';

import UserReviewsList from './UserReviewsList';

const context = describe;
let allUserReviews;

const selectedUserDetailPage = jest.fn();
const selectedReviewDetailPage = jest.fn();
const selectedPlaceDetailPage = jest.fn();

describe('UserReviewsList', () => {
  function renderUserReviewsList() {
    render(<UserReviewsList
      allUserReviews={allUserReviews}
      selectedUserDetailPage={selectedUserDetailPage}
      selectedReviewDetailPage={selectedReviewDetailPage}
      selectedPlaceDetailPage={selectedPlaceDetailPage}
    />);
  }

  context('a manager accesses user reviews list page', () => {
    allUserReviews = [
      {
        id: 100,
        createdAt: '2022-12-05T23:36:33.066172',
        nickname: '네이버룽룽',
        body: '네이버룽룽바디다!!',
        rate: 3,
        userId: 200,
        placeId: 300,
        placeName: '준형이네',
      },
      {
        id: 101,
        createdAt: '2022-12-06T23:36:33.066172',
        nickname: '카카오룽룽',
        body: '카카오룽룽바디다!!',
        rate: 4,
        userId: 201,
        placeId: 305,
        placeName: '승준이네',
      },
      {
        id: 102,
        createdAt: '2022-12-07T23:36:33.066172',
        nickname: '다음룽룽',
        body: '다음룽룽바디다!!',
        rate: 5,
        userId: 202,
        placeId: 305,
        placeName: '승준이네',
      },
    ];

    it('renders user reviews list', () => {
      renderUserReviewsList();

      screen.getByText('No.');
      screen.getByText('작성일');
      screen.getByText('2022-12-07');
      screen.getByText('작성자 닉네임');
      screen.getByText('네이버룽룽');
      screen.getByText('다음룽룽');
      screen.getByText('카카오룽룽');
      screen.getByText('내용');
      screen.getByText('카카오룽룽바디다!!');
      screen.getByText('평점');
      screen.getByText('장소명');
      screen.getByText('준형이네');
    });
  });

  context('a manager clicks nickname, body, place on list page', () => {
    allUserReviews = [
      {
        id: 100, createdAt: '2022-12-05T23:36:33.066172', nickname: '네이버룽룽', body: '네이버룽룽바디다!!', rate: 3, userId: 200, placeId: 300, placeName: '준형이네',
      },
      {
        id: 101, createdAt: '2022-12-06T23:36:33.066172', nickname: '카카오룽룽', body: '카카오룽룽바디다!!', rate: 4, userId: 201, placeId: 305, placeName: '승준이네',
      },
      {
        id: 102, createdAt: '2022-12-07T23:36:33.066172', nickname: '다음룽룽', body: '다음룽룽바디다!!', rate: 5, userId: 202, placeId: 305, placeName: '승준이네',
      },
    ];

    it('direct user, review, place detail page of 네이버룽룽', () => {
      renderUserReviewsList();

      fireEvent.click(screen.getByText('네이버룽룽'));

      expect(selectedUserDetailPage).toBeCalledWith(200);

      fireEvent.click(screen.getByText('카카오룽룽바디다!!'));

      expect(selectedReviewDetailPage).toBeCalledWith(101);

      fireEvent.click(screen.getByText('준형이네'));

      expect(selectedPlaceDetailPage).toBeCalledWith(300);
    });
  });
});
