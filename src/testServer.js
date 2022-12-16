/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { cloudinaryName, cloudinaryKey } = config;

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
