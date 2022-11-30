import { render, screen } from '@testing-library/react';
import PlacesPage from './PlacesPage';

const context = describe;

describe('PlacesPage', () => {
  function renderPlacesPage() {
    render(<PlacesPage />);
  }

  context('a manager clicks places page menu', () => {
    it('renders places page', () => {
      renderPlacesPage();

      screen.getByText('places page');
    });
  });
});
