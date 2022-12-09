import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import UsersPage from './UsersPage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let users;
const fetchAllUsers = jest.fn();

jest.mock('../hooks/useUserStore', () => () => ({
  users,
  fetchAllUsers,
}));

describe('UsersPage', () => {
  function renderUsersPage() {
    render(<UsersPage />);
  }

  context('a manager clicks users page button', () => {
    beforeEach(() => {
      users = [
        {
          id: 157,
          nickname: '민지룽룽',
          email: 'angel2645@naver.com',
          socialLoginId: 'pu_j0E',
          createdAt: '2022-12-08T15:46:52.532925',
          authBy: 'naver',
          state: 'registered',
        },
        {
          id: 160,
          nickname: '전민지룽룽',
          email: 'mjjeon2645@gmail.com',
          socialLoginId: 'pu_j0EAAA',
          createdAt: '2022-12-12T15:46:52.532925',
          authBy: 'kakao',
          state: 'registered',
        },
      ];
    });

    it('renders users page', () => {
      renderUsersPage();

      screen.getByText('회원 관리 > 전체');
      screen.getByText('고유번호');
      screen.getByText('회원가입 일자');
      screen.getByText('angel2645@naver.com');
      screen.getByText('mjjeon2645@gmail.com');
      screen.getByText('2022-12-12');

      fireEvent.click(screen.getByText('전민지룽룽'));

      expect(navigate).toBeCalledWith('/users/160');
    });
  });
});
