import { fireEvent, render, screen } from '@testing-library/react';
import PlacesPage from './PlacesPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let places;
const fetchPlaces = jest.fn();

jest.mock('../hooks/usePlaceStore', () => () => ({
  places,
  fetchPlaces,
}));

const context = describe;

describe('PlacesPage', () => {
  function renderPlacesPage() {
    render(<PlacesPage />);
  }

  context('a manager clicks places page menu', () => {
    beforeEach(() => {
      places = [
        {
          placeId: 1, name: '일번 장소', address: { fullAddress: '서울시 광진구' }, category: '자연',
        },
      ];
    });

    it('renders places page', () => {
      renderPlacesPage();

      expect(fetchPlaces).toBeCalled();

      fireEvent.click(screen.getByText('일번 장소'));

      expect(navigate).toBeCalledWith('/places/1');

      fireEvent.click(screen.getByText('신규 장소 추가하기'));

      expect(navigate).toBeCalledWith('/places/new');
    });
  });
});
