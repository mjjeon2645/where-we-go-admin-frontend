import { render } from '@testing-library/react';
import SignUpForm from './SignUpForm';

const context = describe;

describe('SignUpForm', () => {
  function renderSignUpForm() {
    render(<SignUpForm />);
  }

  context('a manager accesses signup page', () => {
    it('renders a sign up form', () => {
      renderSignUpForm();
    });
  });
});
