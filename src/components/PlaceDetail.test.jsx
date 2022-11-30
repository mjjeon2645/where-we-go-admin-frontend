import { render } from '@testing-library/react';
import PlaceDetail from './PlaceDetail';

const context = describe;

describe('PlaceDetail', () => {
  function renderPlaceDetail() {
    render(<PlaceDetail />);
  }

  context('a manager clicks the place', () => {
    it('renders Place detail', () => {
      renderPlaceDetail();
    });
  });
});
