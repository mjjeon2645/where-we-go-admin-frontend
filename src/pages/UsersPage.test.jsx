import { render } from '@testing-library/react';
import UsersPage from './UsersPage';

const context = describe;

describe('UsersPage', () => {
  function renderUsersPage() {
    render(<UsersPage />);
  }

  context('a manager clicks users page button', () => {
    it('renders users page', () => {
      renderUsersPage();
    });
  });
});
