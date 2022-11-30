import { render } from '@testing-library/react';
import UserReviewsPage from './UserReviewsPage';

const context = describe;

describe('UserReviewsPage', () => {
  function renderUserReviewsPage() {
    render(<UserReviewsPage />);
  }

  context('a manager clicks user reviews menu', () => {
    it('renders User Reviews Page', () => {
      renderUserReviewsPage();
    });
  });
});
