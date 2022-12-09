import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoginForm from './LoginForm';

const context = describe;

const submit = jest.fn();
const goSignUp = jest.fn();

let errorMessage;

describe('LoginForm', () => {
  function renderLoginForm() {
    render(<LoginForm
      submit={submit}
      errorMessage={errorMessage}
      goSignUp={goSignUp}
    />);
  }

  context('a manager accesses login page', () => {
    beforeEach(() => {
      errorMessage = '';
    });

    it('renders Login Form', () => {
      renderLoginForm();

      screen.getByText('Admin Login');
      screen.getAllByPlaceholderText('아이디');
      screen.getAllByPlaceholderText('비밀번호');
      screen.getByText('로그인');
      screen.getByText('어드민 계정 생성하기');
    });
  });

  context('아이디, 비밀번호 입력 후 로그인 버튼 클릭', () => {
    beforeEach(() => {
      errorMessage = '';
    });

    it('입력정보 제출', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'angel2645' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'tester123!' },
      });

      fireEvent.click(screen.getByText('로그인'));

      await waitFor(() => {
        expect(submit).toBeCalled();
      });
    });
  });

  context('어드민 계정 생성 클릭', () => {
    beforeEach(() => {
      errorMessage = '';
    });

    it('계정 생성 페이지로 이동', async () => {
      renderLoginForm();

      fireEvent.click(screen.getByText('어드민 계정 생성하기'));

      expect(goSignUp).toBeCalled();
    });
  });
});
