import { render, screen } from '@testing-library/react';

import UserReviewsListOfSelectedUser from './UserReviewsListOfSelectedUser';

const context = describe;

let userReviews;

describe('UserReviewsListOfSelectedUser', () => {
  function renderUserReviewsListOfSelectedUser() {
    render(<UserReviewsListOfSelectedUser userReviews={userReviews} />);
  }

  context('a manager accesses user detail page', () => {
    userReviews = [
      {
        id: 1,
        createdAt: '2022-12-08T23:23:28.155691',
        nickname: '하이하이욥',
        body: '이렇게 길게 남겨주세요!',
        rate: 3,
        placeName: '준형이네',
      },
      {
        id: 103,
        createdAt: '2022-12-02T23:23:28.155691',
        nickname: '하이하이욥',
        body: '재밌는 장소였어요',
        rate: 5,
        placeName: '민지네',
      },
    ];

    it('renders page with user reviews list of selected user', () => {
      renderUserReviewsListOfSelectedUser();

      screen.getByText('작성일');
      screen.getByText('2022-12-02');
      screen.getByText('작성자 닉네임');
      screen.getAllByText('하이하이욥');
      screen.getByText('내용');
      screen.getByText('이렇게 길게 남겨주세요!');
      screen.getByText('평점');
      screen.getByText('5');
      screen.getByText('장소명');
      screen.getByText('민지네');
    });
  });

  context('a user wrote no reviews', () => {
    beforeEach(() => {
      userReviews = {};
    });

    it('renders the message', () => {
      renderUserReviewsListOfSelectedUser();

      screen.getByText('작성한 리뷰가 없습니다.');
    });
  });
});
