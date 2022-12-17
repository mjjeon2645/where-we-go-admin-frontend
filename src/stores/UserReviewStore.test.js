import { adminApiService } from '../services/AdminApiService';
import UserReviewStore from './UserReviewStore';

const context = describe;

describe('UserReviewStore', () => {
  let userReviewStore;

  beforeEach(() => {
    userReviewStore = new UserReviewStore();
  });

  context('모든 사용자 리뷰를 가져올 때', () => {
    it('사용자 리뷰가 스토어에 저장', async () => {
      adminApiService.setAccessToken('ACCESS.TOKEN');
      await userReviewStore.fetchAllUserReviews();

      expect(userReviewStore.allUserReviews[1].nickname).toBe('카카오룽룽');
    });
  });

  context('모든 사용자 리뷰를 가져올 때 access token이 유실되었을 경우', () => {
    it('에러', async () => {
      adminApiService.setAccessToken('');
      await userReviewStore.fetchAllUserReviews();

      expect(userReviewStore.errorMessage).toBe('접근 권한이 없습니다.');
    });
  });

  context('리뷰 아이디 100인 리뷰 상세정보를 가져올 때', () => {
    it('해당 리뷰 정보가 스토어에 저장', async () => {
      adminApiService.setAccessToken('ACCESS.TOKEN');
      await userReviewStore.fetchSelectedReview(100);

      expect(userReviewStore.userReview.nickname).toBe('네이버룽룽');
      expect(userReviewStore.userReview.placeName).toBe('준형이네');
    });
  });

  context('리뷰 아이디 100인 리뷰 상세정보를 가져올 때 access token이 유실되었을 경우', () => {
    it('에러', async () => {
      adminApiService.setAccessToken('');
      await userReviewStore.fetchSelectedReview(100);

      expect(userReviewStore.errorMessage).toBe('접근 권한이 없습니다.');
    });
  });

  context('리뷰 아이디 105인 리뷰를 삭제할 때', () => {
    it('장소정보는 사라지고 어드민 로그가 스토어에 저장', async () => {
      adminApiService.setAccessToken('ACCESS.TOKEN');
      userReviewStore.setDeleteReason('비속어 포함');
      userReviewStore.setAdminPassword('Tester123!');
      await userReviewStore.deleteReview(105);

      expect(userReviewStore.adminLog.reason).toBe('비속어 포함');
    });
  });

  context('리뷰 아이디 105인 리뷰를 삭제 할 때 access token이 유실되었을 경우', () => {
    it('에러', async () => {
      adminApiService.setAccessToken('');
      userReviewStore.setDeleteReason('비속어 포함');
      userReviewStore.setAdminPassword('Tester123!');
      await userReviewStore.deleteReview(105);

      expect(userReviewStore.errorMessage).toBe('접근 권한이 없습니다.');
    });
  });

  context('아이디 15인 유저가 쓴 모든 리뷰를 가져올 때', () => {
    it('해당 유저가 쓴 모든 리뷰가 스토어에 저장', async () => {
      await userReviewStore.fetchAllReviewsByUserId(15);

      expect(userReviewStore.userReviewsFoundByUserId[1].placeName).toBe('민지네');
    });
  });
});
