import { render } from '@testing-library/react';
import UserDetailPage from './UserDetailPage';

const context = describe;
describe('UserDetailPage', () => {
  function renderUserDetailPage() {
    render(<UserDetailPage />);
  }

  context('a manager clicks user nickname in users page', () => {
    it('renders user detail page', () => {
      renderUserDetailPage();
    });
  });
});
