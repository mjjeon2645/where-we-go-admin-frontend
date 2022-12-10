import { fireEvent, render, screen } from '@testing-library/react';

import AuthenticationErrorPage from './AuthenticationErrorPage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('AuthenticationError', () => {
  function renderAuthenticationErrorPage() {
    render(<AuthenticationErrorPage />);
  }

  context('Auhtentication error happened', () => {
    it('renders authentication error page', () => {
      renderAuthenticationErrorPage();

      screen.getByText('Authentication Error');
      screen.getByText('접근 권한이 없습니다. 로그인 후 이용해주세요.');

      fireEvent.click(screen.getByText('로그인 페이지로 이동하기'));
    });
  });
});
