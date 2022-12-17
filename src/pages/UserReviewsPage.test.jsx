import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import UserReviewsPage from './UserReviewsPage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let allUserReviews;
let fetchAllUserReviews;

jest.mock('../hooks/useUserReviewStore', () => () => ({
  allUserReviews,
  fetchAllUserReviews,
}));

describe('UserReviewsPage', () => {
  function renderUserReviewsPage() {
    render(<UserReviewsPage />);
  }

  context('a manager clicks user reviews menu', () => {
    beforeEach(() => {
      fetchAllUserReviews = jest.fn();
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
      ];
    });

    it('renders User Reviews Page', () => {
      renderUserReviewsPage();

      screen.getByText('리뷰 관리 > 전체');

      expect(fetchAllUserReviews).toBeCalled();

      fireEvent.click(screen.getByText('네이버룽룽'));

      expect(navigate).toBeCalledWith('/users/200');

      fireEvent.click(screen.getByText('카카오룽룽바디다!!'));

      expect(navigate).toBeCalledWith('/reviews/101');

      fireEvent.click(screen.getByText('승준이네'));

      expect(navigate).toBeCalledWith('/places/305');
    });
  });

  context('there is no authentication', () => {
    beforeEach(() => {
      fetchAllUserReviews = jest.fn(() => 'authentication error');
    });

    it('calls navigate function', async () => {
      renderUserReviewsPage();

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/auth-error');
      });
    });
  });
});
