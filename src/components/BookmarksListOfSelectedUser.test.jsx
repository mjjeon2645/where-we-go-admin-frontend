import { render } from '@testing-library/react';
import BookmarksListOfSelectedUser from './BookmarksListOfSelectedUser';

const context = describe;

describe('BookmarksListOfSelectedUser', () => {
  function renderBookmarksListOfSelectedUser() {
    render(<BookmarksListOfSelectedUser />);
  }

  context('a manager accesses the user detail page', () => {
    it('renders the detail page with selected user bookmarks list', () => {
      renderBookmarksListOfSelectedUser();
    });
  });
});
