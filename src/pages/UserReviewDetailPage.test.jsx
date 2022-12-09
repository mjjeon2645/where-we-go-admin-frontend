import { render } from '@testing-library/react';

import UserReviewDetailPage from './UserReviewDetailPage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let userReview;
let errorMessage;

const fetchSelectedReview = jest.fn();
const clearDeleteState = jest.fn();
const deleteReview = jest.fn();
const setDeleteReason = jest.fn();
const setAdminPassword = jest.fn();

jest.mock('../hooks/useUserReviewStore', () => () => ({
  userReview,
  errorMessage,
  fetchSelectedReview,
  clearDeleteState,
  deleteReview,
  setDeleteReason,
  setAdminPassword,
}));

let adminId;
let employeeIdentificationNumber;

const fetchAdmin = jest.fn();

jest.mock('../hooks/useAdminStore', () => () => ({
  adminId,
  employeeIdentificationNumber,
  fetchAdmin,

}));

describe('UserReviewDetailPage', () => {
  function renderUserReviewDetailPage() {
    render(<UserReviewDetailPage />);
  }

  context('a manager clicks the user review', () => {
    beforeEach(() => {
      userReview = {
        //
      };
    });
    it('renders user review detail page', () => {
      renderUserReviewDetailPage();
    });
  });
});
