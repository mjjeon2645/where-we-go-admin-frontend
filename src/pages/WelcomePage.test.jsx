import { fireEvent, render, screen } from '@testing-library/react';
import WelcomePage from './WelcomePage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('WelcomePage', () => {
  function renderWelcomePage() {
    render(<WelcomePage />);
  }

  context('a manager completes the process of signup', () => {
    it('renders welcome page', () => {
      renderWelcomePage();

      screen.getByText('어드민 계정 생성 완료');
      screen.getByText('어드민 계정 생성이 완료되었습니다.');
      screen.getByText('로그인을 진행해주세요.');

      fireEvent.click(screen.getByText('로그인하기'));
      expect(navigate).toBeCalledWith('/');
    });
  });
});
