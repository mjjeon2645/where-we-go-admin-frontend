import { adminApiService } from '../services/AdminApiService';
import AdminStore from './AdminStore';

const context = describe;

describe('AdminStore', () => {
  let adminStore;

  beforeEach(() => {
    adminStore = new AdminStore();
  });

  context('정확한 정보로 어드민 로그인을 했을 경우', () => {
    it('로그인 성공', async () => {
      await adminStore.adminLogin({ id: 'tester', password: 'tester!' });

      expect(adminStore.adminId).toBe('socialId');
      expect(adminStore.employeeIdentificationNumber).toBe(1234);
    });
  });

  context('id가 틀렸을 경우', () => {
    it('에러메시지', async () => {
      await adminStore.adminLogin({ id: 'error', password: 'tester!' });

      expect(adminStore.errorMessage)
        .toBe('입력하신 정보가 정확하지 않습니다. 아이디와 비밀번호를 다시 확인해주세요.');
    });
  });

  context('password가 틀렸을 경우', () => {
    it('에러메시지', async () => {
      await adminStore.adminLogin({ id: 'tester', password: 'error' });

      expect(adminStore.errorMessage)
        .toBe('입력하신 정보가 정확하지 않습니다. 아이디와 비밀번호를 다시 확인해주세요.');
    });
  });

  context('admin 정보가 정상적으로 불러져왔을 경우', () => {
    it('admin 정보 store에 저장', async () => {
      adminApiService.setAccessToken('ACCESS.TOKEN');
      await adminStore.fetchAdmin();

      expect(adminStore.admin).toStrictEqual(
        {
          name: '민지룽룽',
          employeeIdentificationNumber: 1234,
          profileImage: 'imageUrl',
          socialLoginId: 'socialId',
        },
      );
      expect(adminStore.adminId).toBe('socialId');
      expect(adminStore.employeeIdentificationNumber).toBe(1234);
    });
  });

  context('비정상적 접근일 경우', () => {
    it('error message 저장', async () => {
      adminApiService.setAccessToken('');
      await adminStore.fetchAdmin();

      expect(adminStore.errorMessage).toBe('접근 권한이 없습니다');
    });
  });
});
