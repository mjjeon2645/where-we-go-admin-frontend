import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ModalProvider } from 'styled-react-modal';

import PlaceDetailPage from './PlaceDetailPage';

const context = describe;

const navigate = jest.fn();
let location;

jest.mock('react-router-dom', () => ({
  useNavigate: () => (navigate),
  useLocation: () => location,
}));

let selectedPlace;
let fetchSelectedPlace;

const deletePlace = jest.fn();
const clearError = jest.fn();
const setDeleteReason = jest.fn();
const setAdminPassword = jest.fn();

jest.mock('../hooks/usePlaceStore', () => () => ({
  selectedPlace,
  fetchSelectedPlace,
  deletePlace,
  clearError,
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

describe('PlaceDetailPage', () => {
  function renderPlaceDetailPage() {
    render(
      <ModalProvider>
        <PlaceDetailPage />
      </ModalProvider>,
    );
  }

  context('there is no authentication', () => {
    beforeEach(() => {
      location = { pathname: '/places/10' };
      selectedPlace = {};
      fetchSelectedPlace = jest.fn(() => 'authentication error');
    });

    it('calls navigate with auth-error', async () => {
      renderPlaceDetailPage();

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/auth-error');
      });
    });
  });

  context('a manager clicks a place information', () => {
    beforeEach(() => {
      location = { pathname: '/places/10' };
      selectedPlace = {
        placeId: 10,
        name: '멋진곳',
        position: {
          latitude: 37.09876,
          longitude: 128.9823,
        },
        address: {
          fullAddress: '서울시 성동구 성수',
        },
        category: '자연',
        contact: {
          phone: '02-123-4567',
          homepage: 'http주소',
        },
        placeServices: {
          reservation: 'possible',
          parking: 'impossible',
          outsideFood: 'possible',
          nursingRoom: 'unchecked',
        },
        businessHours: {
          monday: '월요일: 08:00~10:00',
          tuesday: '화요일: 08:00~10:00',
          wednesday: '수요일: 08:00~10:00',
          thursday: '목요일: 08:00~10:00',
          friday: '금요일: 08:00~10:00',
          saturday: '토요일: 08:00~10:00',
          sunday: '일요일: 08:00~10:00',
        },
        imageSource: {
          firstImage: 'firstImage',
          secondImage: 'secondImage',
          thirdImage: 'thirdImage',
        },
      };
      adminId = 'angel2645';
      employeeIdentificationNumber = 1234;
    });

    it('renders the place detail page', async () => {
      renderPlaceDetailPage();

      await waitFor(() => {
        expect(fetchSelectedPlace).toBeCalledWith('10');
        expect(fetchAdmin).toBeCalled();
      });

      screen.getByText('장소 관리 > 상세 정보');

      fireEvent.click(screen.getByText('삭제하기'));

      screen.getByText('장소를 삭제합니다.');
      screen.getByText('담당자 ID: angel2645');
      screen.getByText('담당자 사번: 1234');

      fireEvent.click(screen.getByText('X'));

      screen.getByText('장소 관리 > 상세 정보');

      fireEvent.click(screen.getByText('삭제하기'));

      expect(clearError).toBeCalled();

      fireEvent.change(screen.getByLabelText('사유:'), {
        target: { value: '없어진 장소' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: '1234' },
      });

      fireEvent.click(screen.getByText('삭제'));

      expect(clearError).toBeCalled();
      expect(deletePlace).toBeCalled();
    });
  });
});
