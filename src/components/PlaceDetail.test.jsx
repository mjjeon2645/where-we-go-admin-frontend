import { fireEvent, render, screen } from '@testing-library/react';
import PlaceDetail from './PlaceDetail';

const context = describe;

let selectedPlace;

const deletePlace = jest.fn();
const goPrevPage = jest.fn();

describe('PlaceDetail', () => {
  function renderPlaceDetail() {
    render(<PlaceDetail
      selectedPlace={selectedPlace}
      deletePlace={deletePlace}
      goPrevPage={goPrevPage}
    />);
  }

  context('장소 정보가 없을 때', () => {
    beforeEach(() => {
      selectedPlace = {};
    });
    it('renders Place detail', () => {
      renderPlaceDetail();

      screen.getByText('now loading...');
    });
  });

  context('장소 정보가 있을 때', () => {
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
    it('renders Place detail', () => {
      renderPlaceDetail();

      screen.getByText('장소 고유번호');
      screen.getByText('장소명');
      screen.getByText('위도(latitude)');
      screen.getByText('경도(longitude)');
      screen.getByText('주소');
      screen.getByText('장소 유형');
      screen.getByText('전화번호');
      screen.getByText('홈페이지');
      screen.getByText('예약');
      screen.getAllByText('가능');
      screen.getAllByText('불가능');
      screen.getAllByText('확인 필요');
    });

    context('삭제버튼을 눌렀을 때', () => {
      it('장소정보 삭제 기능 호출', () => {
        renderPlaceDetail();

        fireEvent.click(screen.getByText('삭제하기'));

        expect(deletePlace).toBeCalled();
      });
    });

    context('뒤로가기 버튼을 눌렀을 때', () => {
      it('뒤로가기 기능 호출', () => {
        renderPlaceDetail();

        fireEvent.click(screen.getByText('뒤로가기'));

        expect(goPrevPage).toBeCalled();
      });
    });
  });
});
