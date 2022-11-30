import { render } from '@testing-library/react';
import PlaceRegistrationForm from './PlaceRegistrationForm';

const context = describe;

describe('PlaceRegistrationForm', () => {
  function renderPlaceRegistrationForm() {
    render(<PlaceRegistrationForm />);
  }

  context('a manager clicks the button to add place information', () => {
    it('renders place registration form', () => {
      renderPlaceRegistrationForm();
    });
  });
});
