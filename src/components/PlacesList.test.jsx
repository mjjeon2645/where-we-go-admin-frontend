import { render } from '@testing-library/react';
import PlacesList from './PlacesList';

const context = describe;

describe('PlacesList', () => {
  function renderPlacesList() {
    render(<PlacesList />);
  }

  context('a manager clicks places menu', () => {
    it('renders PlacesList', () => {
      renderPlacesList();
    });
  });
});
