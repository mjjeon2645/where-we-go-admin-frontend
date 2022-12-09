import { fireEvent, render, screen } from '@testing-library/react';

import PlaceDetailPage from './PlaceDetailPage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let selectedPlace;

const fetchSelectedPlace = jest.fn();
const deletePlace = jest.fn();

jest.mock('../hooks/usePlaceStore', () => () => ({
  selectedPlace,
  fetchSelectedPlace,
  deletePlace,
}));

describe('PlaceDetailPage', () => {
  function renderPlaceDetailPage() {
    render(<PlaceDetailPage />);
  }

  context('a manager clicks a place information', () => {
    beforeEach(() => {
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
    });

    it('renders the place detail page', () => {
      renderPlaceDetailPage();

      expect(fetchSelectedPlace).toBeCalled();

      screen.getByText('장소 관리 > 상세 정보');

      fireEvent.click(screen.getByText('삭제하기'));

      expect(deletePlace).toBeCalledWith(10);
    });
  });
});
