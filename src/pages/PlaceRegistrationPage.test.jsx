import { render } from '@testing-library/react';
import PlaceRegistrationPage from './PlaceRegistrationPage';

const context = describe;

describe('PlaceRegistrationPage', () => {
  function renderPlaceRegistrationPage() {
    render(<PlaceRegistrationPage />);
  }

  context('a manager clicks place registration button', () => {
    it('renders Place registration page', () => {
      renderPlaceRegistrationPage();
    });
  });
});
