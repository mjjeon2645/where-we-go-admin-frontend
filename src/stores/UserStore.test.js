import { adminApiService } from '../services/AdminApiService';
import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  context('정상적으로 로그인한 어드민이 모든 사용자 목록을 받아오면', () => {
    it('모든 사용자 정보를 확인할 수 있음', async () => {
      adminApiService.setAccessToken('AccessToken');
      await userStore.fetchAllUsers();

      const { users } = userStore;

      expect(users[0].nickname).toBe('민지룽룽');
      expect(users[0].authBy).toBe('kakao');
      expect(users[1].id).toBe(301);
      expect(users[1].nickname).toBe('민지룽룽네이버');
    });
  });

  context('비정상적인 접근이 발생하면', () => {
    it('에러 발생', async () => {
      adminApiService.setAccessToken('');
      await userStore.fetchAllUsers();

      const { errorMessage } = userStore;

      expect(errorMessage).toBe('authentication error');
    });
  });

  context('정상적으로 로그인한 어드민이 id가 5번인 유저 정보를 받아오면', () => {
    it('모든 사용자 정보를 확인할 수 있음', async () => {
      adminApiService.setAccessToken('AccessToken');
      await userStore.fetchSelectedUser(5);

      const { user, children, bookmarks } = userStore;

      expect(user.nickname).toBe('민지룽룽');
      expect(user.email).toBe('angel2645@naver.com');
      expect(children[1].gender).toBe('아직 몰라요');
      expect(bookmarks[2].name).toBe('콜라네');
    });
  });

  context('비정상적인 접근이 발생하면', () => {
    it('에러 발생', async () => {
      adminApiService.setAccessToken('');
      await userStore.fetchSelectedUser(5);

      const { errorMessage } = userStore;

      expect(errorMessage).toBe('접근 권한이 없습니다.');
    });
  });

  context('사용자 정보가 없으면', () => {
    it('에러 발생', async () => {
      adminApiService.setAccessToken('ACCESS.TOKEN');
      await userStore.fetchSelectedUser(3);

      const { errorMessage } = userStore;

      expect(errorMessage).toBe('사용자 정보가 없습니다.');
    });
  });

  context('정상적으로 로그인한 어드민이 id가 3번인 유저 정보를 삭제한다면', () => {
    it('해당 정보 삭제', async () => {
      adminApiService.setAccessToken('AccessToken');
      await userStore.deleteSelectedUser(3, '회원 요청', 'tester123!');

      const { adminLog } = userStore;

      expect(adminLog.adminId).toBe(1);
      expect(adminLog.reason).toBe('회원 요청');
    });
  });

  context('비정상적인 접근이 발생하면', () => {
    it('에러 발생', async () => {
      adminApiService.setAccessToken('');
      await userStore.deleteSelectedUser(3, '회원 요청', 'tester123!');

      const { errorMessage } = userStore;

      expect(errorMessage).toBe('authentication error');
    });
  });

  context('회원 삭제 사유 작성', () => {
    it('삭제 사유 저장', () => {
      userStore.setDeleteReason('회원 요청');

      const { reason } = userStore;

      expect(reason).toBe('회원 요청');
    });
  });

  context('어드민 비밀번호 입력', () => {
    it('비밀번호 저장', () => {
      userStore.setAdminPassword('password');

      const { password } = userStore;

      expect(password).toBe('password');
    });
  });

  context('삭제상태 clear', () => {
    it('삭제상태 clear', () => {
      userStore.clearDeleteState();

      expect(userStore.reason).toBe('');
      expect(userStore.password).toBe('');
    });
  });

  context('에러메시지 clear', () => {
    it('에러메시지 clear', () => {
      userStore.clearError();

      expect(userStore.errorMessage).toBe('');
    });
  });
});
