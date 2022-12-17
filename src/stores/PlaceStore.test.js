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

  context('장소 전체 목록 가져올 시 accesstoken이 유실될 경우, 비정상적 접근일 경우', () => {
    it('에러메시지를 저장한다.', async () => {
      adminApiService.setAccessToken('');
      await placeStore.fetchPlaces();

      expect(placeStore.errorMessage).toBe('접근 권한이 없습니다');
    });
  });

  context('장소 id 10인 정보를 요청하면', () => {
    it('해당 장소 정보가 store에 저장된다', async () => {
      adminApiService.setAccessToken('ACCESS.TOKEN');
      await placeStore.fetchSelectedPlace(10);

      expect(placeStore.selectedPlace.name).toBe('멋진곳');
      expect(placeStore.selectedPlace.placeServices.reservation).toBe('possible');
    });
  });

  context('장소 id 10을 요청할 때 accesstoken이 유실될 경우, 비정상적 접근일 경우', () => {
    it('에러메시지를 저장한다.', async () => {
      adminApiService.setAccessToken('');
      await placeStore.fetchSelectedPlace(10);

      expect(placeStore.errorMessage).toBe('Missing attribute');
    });
  });

  context('신규 장소 생성을 요청하면', () => {
    it('해당 장소 정보가 store에 저장된다', async () => {
      adminApiService.setAccessToken('ACCESS.TOKEN');
      const data = {
        placeName: '장소이름',
        category: '스포츠/레저',
        detailAddress: '상세주소',
        firstImage: 'firstImage',
        secondImage: 'secondImage',
        thirdImage: 'thirdImage',
        fullAddress: '경기 성남시',
        homepage: '홈페이지',
        phone: '전화번호',
        latitude: 37.4020,
        longitude: 127.1087,
        nursingRoom: 'unchecked',
        outsideFood: 'impossible',
        parking: 'possible',
        reservation: 'possible',
        sido: '경기',
        sigungu: '성남시',
        weekdayStart: '10:14',
        weekdayEnd: '10:15',
        weekendStart: '10:14',
        weekendEnd: '10:15',
      };
      await placeStore.requestForAddingNewPlace(data);

      expect(placeStore.selectedPlace.name).toBe('장소이름');
      expect(placeStore.selectedPlace.id).toBe(150);
    });
  });

  context('신규장소 생성 요청 시 accesstoken이 유실될 경우, 비정상적 접근일 경우', () => {
    it('에러메시지를 저장한다.', async () => {
      adminApiService.setAccessToken('');
      const data = {
        placeName: '장소이름',
        category: '스포츠/레저',
        detailAddress: '상세주소',
        firstImage: 'firstImage',
        secondImage: 'secondImage',
        thirdImage: 'thirdImage',
        fullAddress: '경기 성남시',
        homepage: '홈페이지',
        phone: '전화번호',
        latitude: 37.4020,
        longitude: 127.1087,
        nursingRoom: 'unchecked',
        outsideFood: 'impossible',
        parking: 'possible',
        reservation: 'possible',
        sido: '경기',
        sigungu: '성남시',
        weekdayStart: '10:14',
        weekdayEnd: '10:15',
        weekendStart: '10:14',
        weekendEnd: '10:15',
      };
      await placeStore.requestForAddingNewPlace(data);

      expect(placeStore.errorMessage).toBe('Missing attribute');
    });
  });

  context('장소를 삭제하면', () => {
    it('어드민 로그가 store에 저장된다', async () => {
      adminApiService.setAccessToken('ACCESS.TOKEN');
      placeStore.setDeleteReason('삭제할겁니다~');
      placeStore.setAdminPassword('Tester123!');
      await placeStore.deletePlace(5);

      expect(placeStore.adminLog.reason).toBe('삭제할겁니다~');
    });
  });

  context('장소 삭제 시 accesstoken이 유실될 경우, 비정상적 접근일 경우', () => {
    it('에러메시지를 저장한다.', async () => {
      adminApiService.setAccessToken('');
      placeStore.setDeleteReason('삭제할겁니다~');
      placeStore.setAdminPassword('Tester123!');
      await placeStore.deletePlace(5);

      expect(placeStore.errorMessage).toBe('접근 권한이 없습니다.');
    });
  });
});
