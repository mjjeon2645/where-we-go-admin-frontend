import { fireEvent, render, screen } from '@testing-library/react';

import UserReviewDetail from './UserReviewDetail';

const context = describe;
let userReview;

const toggleModal = jest.fn();
const goToPrevPage = jest.fn();

describe('UserReviewDetail', () => {
  function renderUserReviewDetail() {
    render(<UserReviewDetail
      userReview={userReview}
      toggleModal={toggleModal}
      goToPrevPage={goToPrevPage}
    />);
  }

  context('a manager watches userReviewDetailPage', () => {
    beforeEach(() => {
      userReview = {
        id: 100,
        nickname: '룽룽룽',
        createdAt: '2022-12-06T23:36:33.066172',
        dateOfVisit: '2022-12-03',
        placeName: '여기저기',
        rate: 5,
        body: '여기저기 가보니까 정말 좋아요 재밌는 곳이었어요~!',
      };
    });

    it('renders UserReviewDetail', () => {
      renderUserReviewDetail();

      screen.getByText('리뷰 고유번호');
      screen.getByText('100');
      screen.getByText('작성자 닉네임');
      screen.getByText('룽룽룽');
      screen.getByText('작성일');
      screen.getByText('2022-12-06');
      screen.getByText('방문일');
      screen.getByText('2022-12-03');
      screen.getByText('방문 장소');
      screen.getByText('여기저기');
      screen.getByText('평점');
      screen.getByText('5');
      screen.getByText('내용');
      screen.getByText('여기저기 가보니까 정말 좋아요 재밌는 곳이었어요~!');
    });
  });

  context('a manager clicks delete button', () => {
    beforeEach(() => {
      userReview = {
        id: 100,
        nickname: '룽룽룽',
        createdAt: '2022-12-06T23:36:33.066172',
        dateOfVisit: '2022-12-03',
        placeName: '여기저기',
        rate: 5,
        body: '여기저기 가보니까 정말 좋아요 재밌는 곳이었어요~!',
      };
    });

    it('calls modal', () => {
      renderUserReviewDetail();

      fireEvent.click(screen.getByText('삭제하기'));

      expect(toggleModal).toBeCalled();
    });
  });

  context('a manager clicks button to previous page', () => {
    beforeEach(() => {
      userReview = {
        id: 100,
        nickname: '룽룽룽',
        createdAt: '2022-12-06T23:36:33.066172',
        dateOfVisit: '2022-12-03',
        placeName: '여기저기',
        rate: 5,
        body: '여기저기 가보니까 정말 좋아요 재밌는 곳이었어요~!',
      };
    });

    it('calls function to move to previous page', () => {
      renderUserReviewDetail();

      fireEvent.click(screen.getByText('뒤로가기'));

      expect(goToPrevPage).toBeCalled();
    });
  });
});
