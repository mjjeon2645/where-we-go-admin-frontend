import { render } from '@testing-library/react';
import UserReviewDetailPage from './UserReviewDetailPage';

const context = describe;

describe('UserReviewDetailPage', () => {
  function renderUserReviewDetailPage() {
    render(<UserReviewDetailPage />);
  }

  context('a manager clicks the user review', () => {
    it('renders user review detail page', () => {
      renderUserReviewDetailPage();
    });
  });
});
