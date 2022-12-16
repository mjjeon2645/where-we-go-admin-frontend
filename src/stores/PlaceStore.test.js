import { adminApiService } from '../services/AdminApiService';
import PlaceStore from './PlaceStore';

const context = describe;

describe('PlaceStore', () => {
  let placeStore;

  beforeEach(() => {
    placeStore = new PlaceStore();
  });

  context('장소 전체목록을 가져오면', () => {
    it('장소 리스트가 store에 저장된다', async () => {
      adminApiService.setAccessToken('ACCESS.TOKEN');
      await placeStore.fetchPlaces();

      expect(placeStore.places[1].name).toBe('이번 장소');
      expect(placeStore.places[2]).toStrictEqual({
        placeId: 3, name: '삼번 장소', address: { fullAddress: '세종시' }, category: '키즈존 맛집',
      });
    });
  });

  context('accesstoken이 유실될 경우, 비정상적 접근일 경우', () => {
    it('에러메시지를 저장한다.', async () => {
      adminApiService.setAccessToken('');
      await placeStore.fetchPlaces();

      expect(placeStore.errorMessage).toBe('접근 권한이 없습니다');
    });
  });
});
