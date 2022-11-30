import { render } from '@testing-library/react';
import NewPlaceForm from './NewPlaceForm';

const context = describe;

describe('PlaceRegistrationForm', () => {
  function renderNewPlaceForm() {
    render(<NewPlaceForm />);
  }

  context('a manager clicks the button to add place information', () => {
    it('renders NewPlaceForm', () => {
      renderNewPlaceForm();
    });
  });
});
