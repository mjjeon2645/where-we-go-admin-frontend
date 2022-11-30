import { render, screen } from '@testing-library/react';
import PlaceDetailPage from './PlaceDetailPage';

const context = describe;

describe('PlaceDetailPage', () => {
  function renderPlaceDetailPage() {
    render(<PlaceDetailPage />);
  }

  context('a manager clicks a place information', () => {
    it('renders the place detail page', () => {
      renderPlaceDetailPage();

      screen.getByText('주소');
    });
  });
});
