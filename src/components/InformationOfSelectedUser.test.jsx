import { fireEvent, render, screen } from '@testing-library/react';
import InformationOfSelectedUser from './InformationOfSelectedUser';

const context = describe;

let user;
const deleteUser = jest.fn();

describe('InformationOfSeclectedUser', () => {
  function renderInformationOfSelectedUser() {
    render(<InformationOfSelectedUser
      user={user}
      deleteUser={deleteUser}
    />);
  }

  context('유저 정보가 있는 경우', () => {
    beforeEach(() => {
      user = {
        id: 155,
        nickname: '민지룽룽',
        email: 'angel2645@naver.com',
        socialLoginId: 'angel2645',
        createdAt: '2022-12-08T15:24:50.945229',
        authBy: 'kakao',
        state: 'registered',
      };
    });

    it('renders information of selected user', () => {
      renderInformationOfSelectedUser();

      screen.getByText('사용자 고유번호');
      screen.getByText('155');
      screen.getByText('닉네임');
      screen.getByText('민지룽룽');
      screen.getByText('이메일');
      screen.getByText('angel2645@naver.com');
      screen.getByText('소셜 로그인 아이디');
      screen.getByText('angel2645');
      screen.getByText('회원가입 일자');
      screen.getByText('2022-12-08');
      screen.getByText('인증 방식');
      screen.getByText('kakao');
      screen.getByText('가입 상태');
      screen.getByText('가입 완료');
    });
  });

  context('유저 정보가 없는 경우', () => {
    beforeEach(() => {
      user = {};
    });

    it('renders loading message', () => {
      renderInformationOfSelectedUser();

      screen.getByText('now loading...');
    });
  });

  context('유저 정보를 삭제하기', () => {
    beforeEach(() => {
      user = {
        id: 155,
        nickname: '민지룽룽',
        email: 'angel2645@naver.com',
        socialLoginId: 'angel2645',
        createdAt: '2022-12-08T15:24:50.945229',
        authBy: 'kakao',
        state: 'registered',
      };
    });

    it('called function of deleteUser', () => {
      renderInformationOfSelectedUser();

      fireEvent.click(screen.getByText('회원 삭제'));

      expect(deleteUser).toBeCalled();
    });
  });
});
