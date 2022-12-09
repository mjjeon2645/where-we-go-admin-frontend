import { fireEvent, render, screen } from '@testing-library/react';

import PlacesList from './PlacesList';

const context = describe;

let places;
const goAddPlacePage = jest.fn();
const goPlaceDetailPage = jest.fn();

describe('PlacesList', () => {
  function renderPlacesList() {
    render(<PlacesList
      places={places}
      goAddPlacePage={goAddPlacePage}
      goPlaceDetailPage={goPlaceDetailPage}
    />);
  }

  context('a manager clicks places menu', () => {
    beforeEach(() => {
      places = [
        {
          placeId: 1, name: '일번 장소', address: { fullAddress: '서울시 광진구' }, category: '자연',
        },
        {
          placeId: 2, name: '이번 장소', address: { fullAddress: '대전시 중구' }, category: '유적지',
        },
        {
          placeId: 3, name: '삼번 장소', address: { fullAddress: '세종시' }, category: '키즈존 맛집',
        },
      ];
    });

    it('renders PlacesList', () => {
      renderPlacesList();

      screen.getByText('신규 장소 추가하기');
      screen.getByText('장소명');
      screen.getByText('고유번호');
      screen.getByText('카테고리');
      screen.getByText('일번 장소');
      screen.getByText('대전시 중구');
      screen.getByText('세종시');
      screen.getByText('키즈존 맛집');
    });
  });

  context('id: 3 게시물 클릭', () => {
    beforeEach(() => {
      places = [
        {
          placeId: 1, name: '일번 장소', address: { fullAddress: '서울시 광진구' }, category: '자연',
        },
        {
          placeId: 2, name: '이번 장소', address: { fullAddress: '대전시 중구' }, category: '유적지',
        },
        {
          placeId: 3, name: '삼번 장소', address: { fullAddress: '세종시' }, category: '키즈존 맛집',
        },
      ];
    });

    it('renders PlacesList', () => {
      renderPlacesList();

      fireEvent.click(screen.getByText('삼번 장소'));

      expect(goPlaceDetailPage).toBeCalledWith(3);
    });
  });

  context('신규 장소 추가하기 버튼 클릭', () => {
    it('페이지 이동 함수 호출', () => {
      renderPlacesList();

      fireEvent.click(screen.getByText('신규 장소 추가하기'));
      expect(goAddPlacePage).toBeCalled();
    });
  });
});
