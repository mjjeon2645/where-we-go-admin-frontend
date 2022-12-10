import { fireEvent, render, screen } from '@testing-library/react';

import UsersList from './UsersList';

const context = describe;

let users;
const goUserDetailPage = jest.fn();

describe('UsersList', () => {
  function renderUsersList() {
    render(<UsersList
      users={users}
      goUserDetailPage={goUserDetailPage}
    />);
  }

  context('a manager access users page', () => {
    beforeEach(() => {
      users = [
        {
          id: 1,
          nickname: '민지룽룽',
          email: 'test1@test.com',
          createdAt: '2022-12-02T23:23:28.155691',
          authBy: 'kakao',
        },
        {
          id: 301,
          nickname: '민지룽룽네이버',
          email: 'test2@test.com',
          createdAt: '2022-12-03T23:23:28.155691',
          authBy: 'naver',
        },
      ];
    });

    it('renders users list on the page', () => {
      renderUsersList();

      screen.getByText('No.');
      screen.getByText('고유번호');
      screen.getByText('301');
      screen.getByText('닉네임');
      screen.getByText('민지룽룽네이버');
      screen.getByText('이메일');
      screen.getByText('test2@test.com');
      screen.getByText('회원가입 일자');
      screen.getByText('2022-12-03');
      screen.getByText('인증 방식');
      screen.getByText('kakao');
      screen.getByText('naver');
    });
  });

  context('a manager clicks user name', () => {
    beforeEach(() => {
      users = [
        {
          id: 1,
          nickname: '민지룽룽',
          email: 'test1@test.com',
          createdAt: '2022-12-02T23:23:28.155691',
          authBy: 'kakao',
        },
        {
          id: 301,
          nickname: '민지룽룽네이버',
          email: 'test2@test.com',
          createdAt: '2022-12-03T23:23:28.155691',
          authBy: 'naver',
        },
      ];
    });

    it('direct user detail page', () => {
      renderUsersList();

      fireEvent.click(screen.getByText('민지룽룽네이버'));

      expect(goUserDetailPage).toBeCalledWith(301);
    });
  });
});
