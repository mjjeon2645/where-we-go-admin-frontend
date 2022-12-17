import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ModalProvider } from 'styled-react-modal';
import { todayFormatter } from '../utils/dateFormatter';
import DeleteUserModal from './DeleteUserModal';

let isOpen;
let adminId;
let employeeIdentificationNumber;
let errorMessage;

const toggleModal = jest.fn();
const deleteUser = jest.fn();
const setDeleteReason = jest.fn();
const setAdminPassword = jest.fn();

const context = describe;

describe('DeleteUserModal', () => {
  function renderDeleteUserModal() {
    render(
      <ModalProvider>
        <DeleteUserModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          deleteUser={deleteUser}
          setDeleteReason={setDeleteReason}
          adminId={adminId}
          employeeIdentificationNumber={employeeIdentificationNumber}
          setAdminPassword={setAdminPassword}
          errorMessage={errorMessage}
        />
      </ModalProvider>,
    );
  }

  context('a manager clicks delete the user button and delete the user', () => {
    isOpen = true;
    adminId = 'angel2645';
    employeeIdentificationNumber = 1234;
    errorMessage = '';
    const today = todayFormatter(new Date());

    it('renders deleteUserModal and delete the user', () => {
      renderDeleteUserModal();

      screen.getByText('회원정보를 삭제합니다.');
      screen.getByText('담당자 ID: angel2645');
      screen.getByText('담당자 사번: 1234');
      screen.getByText(`삭제일: ${today}`);

      fireEvent.change(screen.getByLabelText('사유:'), {
        target: { value: '회원 요청' },
      });

      expect(setDeleteReason).toBeCalled();

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Tester123!' },
      });

      expect(setAdminPassword).toBeCalled();

      fireEvent.click(screen.getByText('삭제'));

      expect(deleteUser).toBeCalled();
    });
  });

  context('a manager clicks delete the user button and input wrong password', () => {
    isOpen = true;
    adminId = 'angel2645';
    employeeIdentificationNumber = 1234;
    errorMessage = '비밀번호를 확인해주세요';
    const today = todayFormatter(new Date());

    it('renders error message', async () => {
      renderDeleteUserModal();

      screen.getByText('회원정보를 삭제합니다.');
      screen.getByText('담당자 ID: angel2645');
      screen.getByText('담당자 사번: 1234');
      screen.getByText(`삭제일: ${today}`);

      fireEvent.change(screen.getByLabelText('사유:'), {
        target: { value: '회원 요청' },
      });

      expect(setDeleteReason).toBeCalled();

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'xxx' },
      });

      expect(setAdminPassword).toBeCalled();

      fireEvent.click(screen.getByText('삭제'));

      await waitFor(() => {
        screen.getByText('비밀번호를 확인해주세요');
      });

      fireEvent.click(screen.getByText('X'));

      expect(toggleModal).toBeCalled();
    });
  });
});
