import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

const context = describe;

describe('LoginPage', () => {
  function renderLoginPage() {
    render(<LoginPage />);
  }

  context('a manager accesses login page', () => {
    it('renders LoginPage', () => {
      renderLoginPage();

      screen.getByText('Login Page');
    });
  });
});
