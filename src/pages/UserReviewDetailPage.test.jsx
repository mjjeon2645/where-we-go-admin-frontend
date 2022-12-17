import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ModalProvider } from 'styled-react-modal';

import UserReviewDetailPage from './UserReviewDetailPage';

const context = describe;

const navigate = jest.fn();
let location;

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useLocation: () => location,
}));

let userReview;
let errorMessage;

let fetchSelectedReview;
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
    render(
      <ModalProvider>
        <UserReviewDetailPage />
      </ModalProvider>,
    );
  }

  context('a manager clicks the user review and delete the review', () => {
    beforeEach(() => {
      fetchSelectedReview = jest.fn(() => '');

      location = { pathname: '/reviews/143' };

      userReview = {
        id: 143,
        nickname: '민지룽룽',
        dateOfVisit: '2022-11-30',
        createdAt: '2022-12-12T06:28:42.209685',
        placeName: '크라운해태 키즈뮤지엄',
        body: '아이가 과자로 만든 집을 너무 좋아했어요!! 즐거웠습니다',
      };
    });

    it('renders user review detail page and then delete the review', async () => {
      renderUserReviewDetailPage();

      screen.getByText('리뷰 관리 > 상세 정보');

      fireEvent.click(screen.getByText('삭제하기'));

      screen.getByText('리뷰를 삭제합니다.');

      fireEvent.change(screen.getByLabelText('사유:'), {
        target: { value: '비속어가 포함되어 있음' },
      });

      expect(setDeleteReason).toBeCalledWith('비속어가 포함되어 있음');

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'tester123!' },
      });

      expect(setAdminPassword).toBeCalledWith('tester123!');

      fireEvent.click(screen.getByText('삭제'));

      expect(clearDeleteState).toBeCalled();
      expect(deleteReview).toBeCalled();
    });
  });

  context('no authentication', () => {
    beforeEach(() => {
      fetchSelectedReview = jest.fn(() => 'authentication error');
    });

    it('renders user review detail page', async () => {
      renderUserReviewDetailPage();

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/auth-error');
      });
    });
  });
});
