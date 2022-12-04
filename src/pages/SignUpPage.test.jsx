import { render } from '@testing-library/react';
import SignUpPage from './SignUpPage';

const context = describe;

describe('SignUpPage', () => {
  function renderSignUpPage() {
    render(<SignUpPage />);
  }

  context('a manager clicks to init a new admin account', () => {
    it('renders sign up form', () => {
      renderSignUpPage();
    });
  });
});
