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
const clearError = jest.fn();
let adminLogin;

jest.mock('../hooks/useAdminStore', () => () => ({
  errorMessage,
  clearError,
  adminLogin,
}));

describe('LoginPage', () => {
  function renderLoginPage() {
    render(<LoginPage />);
  }

  context('로그인 폼 입력 및 로그인 시도', () => {
    beforeEach(() => {
      errorMessage = '';
      adminLogin = jest.fn(() => 'ACCESS.TOKEN');
    });

    it('로그인 요청', async () => {
      renderLoginPage();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'tester123' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Tester123!' },
      });

      fireEvent.click(screen.getByText('로그인'));

      await waitFor(() => {
        expect(adminLogin).toBeCalled();
        expect(clearError).toBeCalled();
        expect(navigate).toBeCalledWith('/places');
      });
    });
  });

  context('아이디 미입력', () => {
    beforeEach(() => {
      errorMessage = '아이디를 입력해주세요';
      adminLogin = jest.fn(() => '');
    });

    it('로그인 요청', async () => {
      renderLoginPage();

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Qqwer1234!' },
      });

      fireEvent.click(screen.getByText('로그인'));

      await waitFor(() => {
        screen.getByText('아이디를 입력해주세요');
      });
    });
  });

  context('비밀번호 미입력', () => {
    beforeEach(() => {
      errorMessage = '비밀번호를 입력해주세요';
      adminLogin = jest.fn(() => '');
    });

    it('로그인 요청', async () => {
      renderLoginPage();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'tester123' },
      });

      fireEvent.click(screen.getByText('로그인'));

      await waitFor(() => {
        screen.getByText('비밀번호를 입력해주세요');
      });
    });
  });

  context('틀린 아이디/비밀번호 입력', () => {
    beforeEach(() => {
      errorMessage = '입력하신 정보가 정확하지 않습니다. 아이디와 비밀번호를 다시 확인해주세요.';
      adminLogin = jest.fn(() => '');
    });

    it('로그인 요청', async () => {
      renderLoginPage();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'tester123' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Qqwer1234!' },
      });

      fireEvent.click(screen.getByText('로그인'));

      await waitFor(() => {
        screen.getByText('입력하신 정보가 정확하지 않습니다. 아이디와 비밀번호를 다시 확인해주세요.');
      });
    });
  });

  // context('계정 생성 버튼 클릭', () => {
  //   it('계정 생성 페이지로 다이렉션', async () => {
  //     renderLoginPage();

  //     fireEvent.click(screen.getByText('어드민 계정 생성하기'));

  //     expect(navigate).toBeCalledWith('/sign-up');
  //   });
  // });
});
