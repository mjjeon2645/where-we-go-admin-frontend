import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoginPage from './LoginPage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let errorMessage;
const adminLogin = jest.fn();

jest.mock('../hooks/useAdminStore', () => () => ({
  errorMessage,
  adminLogin,
}));

describe('LoginPage', () => {
  function renderLoginPage() {
    render(<LoginPage />);
  }

  context('로그인 폼 입력 및 로그인 시도', () => {
    it('로그인 요청', async () => {
      renderLoginPage();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'angel2645' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Qqwer1234!' },
      });

      fireEvent.click(screen.getByText('로그인'));

      await waitFor(() => {
        expect(adminLogin).toBeCalled();
      });
    });
  });

  context('로그인 폼 입력 및 로그인 시도', () => {
    it('로그인 요청', async () => {
      renderLoginPage();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'angel2645' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Qqwer1234!' },
      });

      fireEvent.click(screen.getByText('로그인'));

      await waitFor(() => {
        expect(adminLogin).toBeCalled();
      });
    });
  });

  context('계정 생성 버튼 클릭', () => {
    it('계정 생성 페이지로 다이렉션', async () => {
      renderLoginPage();

      fireEvent.click(screen.getByText('어드민 계정 생성하기'));

      expect(navigate).toBeCalledWith('/sign-up');
    });
  });
});
