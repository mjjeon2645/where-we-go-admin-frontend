import { render } from '@testing-library/react';
import UsersList from './UsersList';

const context = describe;

describe('UsersList', () => {
  function renderUsersList() {
    render(<UsersList />);
  }

  context('a manager access users page', () => {
    it('renders users list on the page', () => {
      renderUsersList();
    });
  });
});
