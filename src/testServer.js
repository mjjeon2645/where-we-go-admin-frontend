/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  // adminStore - adminLogin({id, password})
  rest.post(`${baseUrl}/admin-session`, async (request, response, context) => {
    const { socialLoginId, password } = await request.json();

    if (socialLoginId === 'tester' && password === 'tester!') {
      return response(
        context.status(201),
        context.json({
          socialLoginId: 'socialId',
          accessToken: 'ACCESS.TOKEN',
          employeeIdentificationNumber: 1234,
          profileImage: 'imageurl',
        }),
      );
    }

    if (socialLoginId === 'error' && password === 'tester!') {
      return response(
        context.status(400),
        context.json({
          message: '입력하신 정보가 정확하지 않습니다. 아이디와 비밀번호를 다시 확인해주세요.',
        }),
      );
    }

    if (socialLoginId === 'tester' && password === 'error') {
      return response(
        context.status(400),
        context.json({
          message: '입력하신 정보가 정확하지 않습니다. 아이디와 비밀번호를 다시 확인해주세요.',
        }),
      );
    }

    return '';
  }),

  // adminStore - fetchAdmin()
  rest.get(`${baseUrl}/admin-session`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (accessToken) {
      return response(context.json({
        name: '민지룽룽',
        employeeIdentificationNumber: 1234,
        profileImage: 'imageUrl',
        socialLoginId: 'socialId',
      }));
    }

    if (!accessToken) {
      return response(
        context.status(400),
        context.json({
          message: '접근 권한이 없습니다',
        }),
      );
    }

    return '';
  }),

  // placeStore - fetchPlaces()
  rest.get(`${baseUrl}/admin-places`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (accessToken) {
      return response(context.json({
        places: [
          {
            placeId: 1,
            name: '일번 장소',
            address: { fullAddress: '서울시 광진구' },
            category: '자연',
          },
          {
            placeId: 2,
            name: '이번 장소',
            address: { fullAddress: '대전시 중구' },
            category: '유적지',
          },
          {
            placeId: 3,
            name: '삼번 장소',
            address: { fullAddress: '세종시' },
            category: '키즈존 맛집',
          },
        ],
      }));
    }

    if (!accessToken) {
      return response(
        context.status(400),
        context.json({
          message: '접근 권한이 없습니다',
        }),
      );
    }

    return '';
  }),

  // placeStore - fetchSelectedPlace(id)
  rest.get(`${baseUrl}/admin-places/:id`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    const { id } = request.params;

    if (accessToken && id === '10') {
      return response(context.json({
        placeId: 10,
        name: '멋진곳',
        position: {
          latitude: 37.09876,
          longitude: 128.9823,
        },
        address: {
          fullAddress: '서울시 성동구 성수',
        },
        category: '자연',
        contact: {
          phone: '02-123-4567',
          homepage: 'http주소',
        },
        placeServices: {
          reservation: 'possible',
          parking: 'impossible',
          outsideFood: 'possible',
          nursingRoom: 'unchecked',
        },
        businessHours: {
          monday: '월요일: 08:00~10:00',
          tuesday: '화요일: 08:00~10:00',
          wednesday: '수요일: 08:00~10:00',
          thursday: '목요일: 08:00~10:00',
          friday: '금요일: 08:00~10:00',
          saturday: '토요일: 08:00~10:00',
          sunday: '일요일: 08:00~10:00',
        },
        imageSource: {
          firstImage: 'firstImage',
          secondImage: 'secondImage',
          thirdImage: 'thirdImage',
        },
      }));
    }

    if (!accessToken && id === '10') {
      return response(
        context.status(400),
        context.json({
          message: 'Missing attribute',
        }),
      );
    }

    return '';
  }),

  // placeStore - requestForAddingNewPlace(data)
  rest.post(`${baseUrl}/admin-places/new`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

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

    await request.json(data);

    if (accessToken) {
      return response(context.json({
        id: 150,
        name: '장소이름',
      }));
    }

    if (!accessToken) {
      return response(
        context.status(400),
        context.json({
          message: 'Missing attribute',
        }),
      );
    }

    return '';
  }),

  // placeStore - deletePlace(id)
  rest.post(`${baseUrl}/admin-places/:id`, async (request, response, context) => {
    const { id } = request.params;
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    const { reason, password } = await request.json();

    if (id === '5' && accessToken && reason === '삭제할겁니다~' && password === 'Tester123!') {
      return response(
        context.status(201),
        context.json({
          id: 272,
          adminId: 189,
          eventDto: {
            code: 201,
            title: 'deletePlace',
          },
          reason: '삭제할겁니다~',
          createdAt: '2022-12-17T10:49:49.213172',
        }),
      );
    }

    if (id === '5' && !accessToken && reason === '삭제할겁니다~' && password === 'Tester123!') {
      return response(
        context.status(400),
        context.json({
          message: '접근 권한이 없습니다.',
        }),
      );
    }

    return '';
  }),

  // userReviewStore - fetchAllUserReviews
  rest.get(`${baseUrl}/admin-user-reviews`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (accessToken) {
      return response(context.json({
        userReviews: [
          {
            id: 100,
            createdAt: '2022-12-05T23:36:33.066172',
            nickname: '네이버룽룽',
            body: '네이버룽룽바디다!!',
            rate: 3,
            userId: 200,
            placeId: 300,
            placeName: '준형이네',
          },
          {
            id: 101,
            createdAt: '2022-12-06T23:36:33.066172',
            nickname: '카카오룽룽',
            body: '카카오룽룽바디다!!',
            rate: 4,
            userId: 201,
            placeId: 305,
            placeName: '승준이네',
          },
          {
            id: 102,
            createdAt: '2022-12-07T23:36:33.066172',
            nickname: '다음룽룽',
            body: '다음룽룽바디다!!',
            rate: 5,
            userId: 202,
            placeId: 305,
            placeName: '승준이네',
          },
        ],
      }));
    }

    if (!accessToken) {
      return response(
        context.status(400),
        context.json({
          message: '접근 권한이 없습니다.',
        }),
      );
    }

    return '';
  }),

  // userReviewStore - fetchSelectedReview(id)
  rest.get(`${baseUrl}/admin-user-reviews/:reviewId`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    const { reviewId } = request.params;

    if (accessToken && reviewId === '100') {
      return response(context.json({
        id: 100,
        createdAt: '2022-12-05T23:36:33.066172',
        nickname: '네이버룽룽',
        body: '네이버룽룽바디다!!',
        rate: 3,
        userId: 200,
        placeId: 300,
        placeName: '준형이네',
      }));
    }

    if (!accessToken) {
      return response(
        context.status(400),
        context.json({
          message: '접근 권한이 없습니다.',
        }),
      );
    }

    return '';
  }),

  // userReviewStore - deleteReview(id)
  rest.post(`${baseUrl}/admin-user-reviews/:id`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    const { id } = request.params;

    const { reason, password } = await request.json();

    if (id === '105' && accessToken && reason === '비속어 포함' && password === 'Tester123!') {
      return response(
        context.status(201),
        context.json({
          adminId: 1,
          event: {
            code: 202,
            title: 'deleteUser',
          },
          reason: '비속어 포함',
        }),
      );
    }

    if (id === '105' && !accessToken && reason === '비속어 포함' && password === 'Tester123!') {
      return response(
        context.status(400),
        context.json({
          message: '접근 권한이 없습니다.',
        }),
      );
    }

    return '';
  }),

  // userReviewStore - fetchAllReviewsByUserId(userId)
  rest.get(`${baseUrl}/admin-user-reviews/userId/:userId`, async (request, response, context) => {
    const { userId } = request.params;

    if (userId === '15') {
      return response(
        context.json({
          userReviews: [
            {
              id: 1,
              createdAt: '2022-12-08T23:23:28.155691',
              nickname: '하이하이욥',
              body: '이렇게 길게 남겨주세요!',
              rate: 3,
              placeName: '준형이네',
            },
            {
              id: 103,
              createdAt: '2022-12-02T23:23:28.155691',
              nickname: '하이하이욥',
              body: '재밌는 장소였어요',
              rate: 5,
              placeName: '민지네',
            },
          ],
        }),
      );
    }

    if (userId === '15') {
      return response(
        context.status(400),
        context.json({
          message: '접근 권한이 없습니다.',
        }),
      );
    }

    return '';
  }),

  // userStore - fetchAllUsers
  rest.get(`${baseUrl}/admin-users`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (accessToken) {
      return response(context.json({
        users: [
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
        ],
      }));
    }

    if (!accessToken) {
      return response(
        context.status(400),
        context.json({
          message: 'authentication error',
        }),
      );
    }

    return '';
  }),

  // userStore - fetchSelectedUser(id)
  rest.get(`${baseUrl}/admin-users/:userId`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    const { userId } = request.params;

    if (accessToken && userId === '5') {
      return response(context.json({
        userDto: {
          id: 155,
          nickname: '민지룽룽',
          email: 'angel2645@naver.com',
          socialLoginId: 'angel2645',
          createdAt: '2022-12-08T15:24:50.945229',
          authBy: 'kakao',
          state: 'registered',
        },
        children: [
          { id: 1, gender: '공주님', birthday: '2021-01-03' },
          { id: 2, gender: '아직 몰라요', birthday: '2023-01-03' },
        ],
        bookmarkedPlaces: [
          { placeId: 1, name: '민지네', address: '서울시 종로구' },
          { placeId: 2, name: '고래네', address: '경기도 광주시' },
          { placeId: 3, name: '콜라네', address: '강원도 원주시' },
        ],
      }));
    }

    if (!accessToken && userId === '5') {
      return response(
        context.status(400),
        context.json({
          message: '접근 권한이 없습니다.',
        }),
      );
    }

    if (accessToken && userId === '3') {
      return response(
        context.status(400),
        context.json({
          message: '사용자 정보가 없습니다.',
        }),
      );
    }

    return '';
  }),

  // userStore - deleteSelectedUser(userId)
  rest.post(`${baseUrl}/admin-users/:userId`, async (request, response, context) => {
    const accessToken = request.headers.get('Authorization')
      .substring('Bearer '.length);

    const { userId } = request.params;

    if (accessToken && userId === '3') {
      return response(
        context.status(201),
        context.json({
          createdAdminLog: {
            adminId: 1,
            event: {
              code: 202,
              title: 'deleteUser',
            },
            reason: '회원 요청',
          },
        }),
      );
    }

    if (!accessToken && userId === '3') {
      return response(
        context.status(400),
        context.json({
          message: 'authentication error',
        }),
      );
    }

    return '';
  }),
);

export default server;
