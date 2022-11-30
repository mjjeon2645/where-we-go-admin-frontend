import { render } from '@testing-library/react';
import NewPlacePage from './NewPlacePage';

const context = describe;

describe('NewPlacePage', () => {
  function renderNewPlacePage() {
    render(<NewPlacePage />);
  }

  context('a manager clicks place registration button', () => {
    it('renders NewPlacePage', () => {
      renderNewPlacePage();
    });
  });
});
