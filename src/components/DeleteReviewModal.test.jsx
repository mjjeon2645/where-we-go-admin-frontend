import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ModalProvider } from 'styled-react-modal';

import DeleteReviewModal from './DeleteReviewModal';

const context = describe;
let isOpen;
let adminId;
let errorMessage;
let employeeIdentificationNumber;

const toggleModal = jest.fn();
const deleteReview = jest.fn();
const setDeleteReason = jest.fn();
const setAdminPassword = jest.fn();

describe('DeleteReviewModal', () => {
  function renderDeleteReviewModal() {
    render(
      <ModalProvider>
        <DeleteReviewModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          deleteReview={deleteReview}
          setDeleteReason={setDeleteReason}
          adminId={adminId}
          employeeIdentificationNumber={employeeIdentificationNumber}
          setAdminPassword={setAdminPassword}
          errorMessage={errorMessage}
        />
      </ModalProvider>,
    );
  }

  context('관리자가 리뷰를 삭제하기 위해 정확한 사유 및 비밀번호를 입력한 경우', () => {
    beforeEach(() => {
      isOpen = true;
      adminId = 'jun1234';
      errorMessage = '';
      employeeIdentificationNumber = 1234;
    });

    it('리뷰 삭제', () => {
      renderDeleteReviewModal();

      fireEvent.change(screen.getByLabelText('사유:'), {
        target: { value: '비속어가 포함되어있음' },
      });

      expect(setDeleteReason).toBeCalled();

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: '1234' },
      });

      expect(setAdminPassword).toBeCalled();

      fireEvent.click(screen.getByText('삭제'));

      expect(deleteReview).toBeCalled();
    });
  });

  context('관리자가 리뷰를 삭제하려 했으나 사유를 입력하지 않아 에러 발생', () => {
    beforeEach(() => {
      isOpen = true;
      adminId = 'jun1234';
      errorMessage = '사유를 정확히 입력해주세요';
      employeeIdentificationNumber = 1234;
    });

    it('리뷰 삭제', async () => {
      renderDeleteReviewModal();

      fireEvent.change(screen.getByLabelText('사유:'), {
        target: { value: '     ' },
      });

      expect(setDeleteReason).toBeCalled();

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: '1234' },
      });

      expect(setAdminPassword).toBeCalled();

      fireEvent.click(screen.getByText('삭제'));

      await waitFor(() => {
        screen.getByText('사유를 정확히 입력해주세요');
      });
    });
  });
});
