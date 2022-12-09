import { fireEvent, render, screen } from '@testing-library/react';

import SideMenu from './SideMenu';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  Link: ({ children, to }) => (
    <a href={to}>
      {children}
    </a>
  ),
}));

const fetchAdmin = jest.fn();
let admin;

jest.mock('../hooks/useAdminStore', () => () => ({
  fetchAdmin,
  admin,
}));

const context = describe;

describe('SideMenu', () => {
  function renderSideMenu() {
    render(<SideMenu />);
  }

  context('a manager accesses home page', () => {
    beforeEach(() => {
      admin = {
        name: '민지룽룽',
        employeeIdentificationNumber: 1234,
        profileImage: 'imageUrl',
      };

      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('renders sideMenu', () => {
      renderSideMenu();

      screen.getByText('민지룽룽');
      screen.getByText('사원번호: 1234');
      screen.getByText('장소 관리');
      screen.getByText('회원 관리');
      screen.getByText('리뷰 관리');
      screen.getByText('로그아웃');
    });
  });

  context('로그아웃 버튼 클릭 시', () => {
    beforeEach(() => {
      admin = {
        name: '민지룽룽',
        employeeIdentificationNumber: 1234,
        profileImage: 'imageUrl',
      };

      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('홈 화면(로그인)으로 전환', () => {
      renderSideMenu();

      fireEvent.click(screen.getByText('로그아웃'));

      expect(navigate).toBeCalledWith('/');
    });
  });

  context('어드민 정보 없을 시', () => {
    beforeEach(() => {
      admin = {};
    });

    it('renders empty admin message', () => {
      renderSideMenu();

      screen.getByText('now loading...');
    });
  });
});
