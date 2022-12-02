import { render } from '@testing-library/react';
import UserReviewDetail from './UserReviewDetail';

const context = describe;
describe('UserReviewDetail', () => {
  function renderUserReviewDetail() {
    render(<UserReviewDetail />);
  }

  context('a manager watches userReviewDetailPage', () => {
    it('renders UserReviewDetail', () => {
      renderUserReviewDetail();
    });
  });
});
