import { render } from '@testing-library/react';
import ChildrenListOfSelectedUser from './ChildrenListOfSelectedUser';

const context = describe;
describe('ChildrenListOfSelectedUser', () => {
  function renderChildrenListOfSelectedUser() {
    render(<ChildrenListOfSelectedUser />);
  }

  context('a manager accesses selected user detail page', () => {
    it('renders the page with a children list of selected user', () => {
      renderChildrenListOfSelectedUser();
    });
  });
});
