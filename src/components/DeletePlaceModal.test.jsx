import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ModalProvider } from 'styled-react-modal';
import { todayFormatter } from '../utils/dateFormatter';
import DeletePlaceModal from './DeletePlaceModal';

let isOpen;
let adminId;
let employeeIdentificationNumber;
let errorMessage;

const toggleModal = jest.fn();
const deletePlace = jest.fn();
const setDeleteReason = jest.fn();
const setAdminPassword = jest.fn();

const context = describe;

describe('DeletePlaceModal', () => {
  function renderDeletePlaceModal() {
    render(
      <ModalProvider>
        <DeletePlaceModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          deletePlace={deletePlace}
          setDeleteReason={setDeleteReason}
          adminId={adminId}
          employeeIdentificationNumber={employeeIdentificationNumber}
          setAdminPassword={setAdminPassword}
          errorMessage={errorMessage}
        />
      </ModalProvider>,
    );
  }

  context('a manager clicks delete the place button', () => {
    isOpen = true;
    adminId = 'angel2645';
    employeeIdentificationNumber = 1234;
    errorMessage = '';
    const today = todayFormatter(new Date());

    it('renders delete place modal and delete the place', () => {
      renderDeletePlaceModal();

      screen.getByText('장소를 삭제합니다.');
      screen.getByText('담당자 ID: angel2645');
      screen.getByText('담당자 사번: 1234');
      screen.getByText(`삭제일: ${today}`);

      fireEvent.change(screen.getByLabelText('사유:'), {
        target: { value: '비속어 포함' },
      });

      expect(setDeleteReason).toBeCalled();

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Tester123!' },
      });

      expect(setAdminPassword).toBeCalled();

      fireEvent.click(screen.getByText('삭제'));

      expect(deletePlace).toBeCalled();
    });
  });

  context('a manager clicks delete the place button', () => {
    isOpen = true;
    adminId = 'angel2645';
    employeeIdentificationNumber = 1234;
    errorMessage = '비밀번호를 확인해주세요';
    const today = todayFormatter(new Date());

    it('renders delete place modal and delete the place', async () => {
      renderDeletePlaceModal();

      screen.getByText('장소를 삭제합니다.');
      screen.getByText('담당자 ID: angel2645');
      screen.getByText('담당자 사번: 1234');
      screen.getByText(`삭제일: ${today}`);

      fireEvent.change(screen.getByLabelText('사유:'), {
        target: { value: '비속어 포함' },
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
