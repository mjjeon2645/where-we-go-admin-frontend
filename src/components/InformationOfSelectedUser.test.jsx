import { render } from '@testing-library/react';
import InformationOfSelectedUser from './InformationOfSelectedUser';

const context = describe;

describe('InformationOfSeclectedUser', () => {
  function renderInformationOfSelectedUser() {
    render(<InformationOfSelectedUser />);
  }

  context('a manager accesses user detail page', () => {
    it('renders information of selected user', () => {
      renderInformationOfSelectedUser();
    });
  });
});
