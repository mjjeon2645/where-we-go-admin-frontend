import { render } from '@testing-library/react';
import LoginForm from './LoginForm';

const context = describe;

describe('LoginForm', () => {
  function renderLoginForm() {
    render(<LoginForm />);
  }

  context('a manager accesses login page', () => {
    it('renders Login Form', () => {
      renderLoginForm();
    });
  });
});
