import { render } from '@testing-library/react';
import WelcomePage from './WelcomePage';

const context = describe;

describe('WelcomePage', () => {
  function renderWelcomePage() {
    render(<WelcomePage />);
  }

  context('a manager completes the process of signup', () => {
    it('renders welcome page', () => {
      renderWelcomePage();
    });
  });
});
