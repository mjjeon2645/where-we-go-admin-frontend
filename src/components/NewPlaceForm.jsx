/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';

import styled from 'styled-components';
import Postcode from './Postcode';

import usePlaceStore from '../hooks/usePlaceStore';

import { sidoFormatter } from '../utils/addressFormatter';

const Container = styled.div`
  margin-top: 4em;
`;

const Field = styled.div`
  margin-bottom: 2em;
  width: 40%;
`;

const RadioButtonField = styled.div`
  margin-bottom: 2em;
  width: 40%;

  label {
    font-size: .8em;
    margin-right: .7em;
    color: #333333;
  }
`;

const Label = styled.label`
  font-size: .9em;
  color: #A0A0A0;
  display: block;
  text-align: left;
  margin-bottom: .5em;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding-block: .6em;
  padding-inline: .6em;
  margin-bottom: .7em;
  
  :focus {
    outline: 1px solid #054468;
    }
`;

const Select = styled.select`
  padding: .6em .8em;
`;

const BusinessHoursField = styled.div`
  margin-bottom: 2em;
  width: 60%;

  span, label {
    font-size: .8em;
    margin-inline: 0 .3em;
  }

  input {
    margin: 0 .5em;
  }
`;

const ButinessHoursTitle = styled.p`
  font-size: .9em;
  color: #A0A0A0;
  display: block;
  text-align: left;
  margin-bottom: .5em;
`;

const SubmitButton = styled.button`
  color: #FFF;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-inline: 1em;
  padding: 1em 20px;
  background-color: #054468;
`;

const CancelButton = styled.button`
  border: none;
  border-radius: 8px;
  margin-inline: 1em;
  padding: 1em 30px;
  background-color: #DDD;
`;

const Error = styled.p`
  color: #ff0000;
  margin-top: .3em;
`;

export default function NewPlaceForm({
  uploadFirstImage, firstImageUrl, uploadSecondImage, secondImageUrl,
  uploadThirdImage, thirdImageUrl, submit, goPrevPage,
  isMissingAddress, isMissingCategory, errorMessage,
}) {
  const placeStore = usePlaceStore();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    submit(data);
  };

  const handleFirstImageChange = (event) => {
    uploadFirstImage(event);
  };

  const handleSecondImageChange = (event) => {
    uploadSecondImage(event);
  };

  const handleThirdImageChange = (event) => {
    uploadThirdImage(event);
  };

  const handleGoPrevPageClick = () => {
    goPrevPage();
  };

  const changeRoadAddress = (address) => {
    placeStore.setRoadAddress(address);
  };

  const changeJibunAddress = (address) => {
    placeStore.setJibunAddress(address);
  };

  const changeSido = (sido) => {
    const changedSido = sidoFormatter(sido);
    placeStore.setSido(changedSido);
  };

  const changeSigungu = (sigungu) => {
    placeStore.setSigungu(sigungu);
  };

  const changeLatitude = (latitude) => {
    placeStore.setLatitude(latitude);
  };

  const changeLongitude = (longitude) => {
    placeStore.setLongitude(longitude);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label htmlFor="place-name">장소명: </Label>
          <Input
            id="place-name"
            placeholder="15자 이내 작성 가능"
            {...register('placeName', {
              required: { value: true, message: '15자 이내의 장소 이름을 정확히 입력해주세요' },
              maxLength: { value: 15, message: '장소 이름은 15자 이내로 작성 가능합니다.' },
            })}
            error={errors.placeName}
          />
          {errors.placeName && (
            <Error>{errors.placeName.message}</Error>
          )}
        </Field>
        <Field>
          <Postcode
            changeRoadAddress={changeRoadAddress}
            changeJibunAddress={changeJibunAddress}
            changeSido={changeSido}
            changeSigungu={changeSigungu}
            changeLatitude={changeLatitude}
            changeLongitude={changeLongitude}
          />
          <Label htmlFor="detail-address">상세 주소: </Label>
          <Input id="detail-address" {...register('detailAddress')} />
          {isMissingAddress && (<Error>{errorMessage}</Error>)}
        </Field>
        <Field>
          <Label htmlFor="place-category">장소 유형: </Label>
          <Select
            {...register('category', { required: { value: true } })}
          >
            <option value="select" hidden selected disabled>선택</option>
            <option>스포츠/레저</option>
            <option>교육/체험</option>
            <option>숙박/캠핑</option>
            <option>전시/공연</option>
            <option>자연</option>
            <option>키즈카페</option>
            <option>키즈존 맛집</option>
            <option>유적지</option>
          </Select>
          {isMissingCategory && (<Error>{errorMessage}</Error>)}
        </Field>
        <Field>
          <Label htmlFor="place-phone">전화번호: </Label>
          <Input
            id="place-phone"
            {...register('phone', {
              required: { value: true, message: '연락처를 입력해주세요' },
            })}
            errorr={errors.phone}
          />
          {errors.phone && (
            <Error>{errors.phone.message}</Error>
          )}
        </Field>
        <Field>
          <Label htmlFor="place-homepage">홈페이지: </Label>
          <Input
            id="place-homepage"
            {...register('homepage', {
              required: { value: true, message: '홈페이지 주소를 입력해주세요' },
            })}
            error={errors.homepage}
          />
          {errors.homepage && (
            <Error>{errors.homepage.message}</Error>
          )}
        </Field>
        <RadioButtonField>
          <p>주차: </p>
          <label htmlFor="parking-possible">
            <input
              {...register('parking', {
                required: { value: true, message: '주차 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="possible"
              id="parking-possible"
              error={errors.parking}
            />
            {' '}
            가능
          </label>
          <label htmlFor="parking-impossible">
            <input
              {...register('parking', {
                required: { value: true, message: '주차 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="impossible"
              id="parking-impossible"
            />
            {' '}
            불가능
          </label>
          <label htmlFor="parking-unchecked">
            <input
              {...register('parking', {
                required: { value: true, message: '주차 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="unchecked"
              id="parking-unchecked"
            />
            {' '}
            방문 전 확인 필요
          </label>
          {errors.parking && (
            <Error>{errors.parking.message}</Error>
          )}
        </RadioButtonField>
        <RadioButtonField>
          <p>예약: </p>
          <label htmlFor="reservation-possible">
            <input
              {...register('reservation', {
                required: { value: true, message: '예약 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="possible"
              id="reservation-possible"
              error={errors.reservation}
            />
            {' '}
            가능
          </label>
          <label htmlFor="reservation-impossible">
            <input
              {...register('reservation', {
                required: { value: true, message: '예약 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="impossible"
              id="reservation-impossible"
            />
            {' '}
            불가능
          </label>
          <label htmlFor="reservation-unchecked">
            <input
              {...register('reservation', {
                required: { value: true, message: '예약 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="unchecked"
              id="reservation-unchecked"
            />
            {' '}
            방문 전 확인 필요
          </label>
          {errors.reservation && (
            <Error>{errors.reservation.message}</Error>
          )}
        </RadioButtonField>
        <RadioButtonField>
          <p>외부음식: </p>
          <label htmlFor="outside-food-possible">
            <input
              {...register('outsideFood', {
                required: { value: true, message: '외부음식 반입 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="possible"
              id="outside-food-possible"
              error={errors.outsideFood}
            />
            {' '}
            가능
          </label>
          <label htmlFor="outside-food-impossible">
            <input
              {...register('outsideFood', {
                required: { value: true, message: '외부음식 반입 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="impossible"
              id="outside-food-impossible"
            />
            {' '}
            불가능
          </label>
          <label htmlFor="outside-food-unchecked">
            <input
              {...register('outsideFood', {
                required: { value: true, message: '외부음식 반입 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="unchecked"
              id="outside-food-unchecked"
            />
            {' '}
            방문 전 확인 필요
          </label>
          {errors.outsideFood && (
            <Error>{errors.outsideFood.message}</Error>
          )}
        </RadioButtonField>
        <RadioButtonField>
          <p>수유실: </p>
          <label htmlFor="nursing-room-possible">
            <input
              {...register('nursingRoom', {
                required: { value: true, message: '수유실 사용 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="possible"
              id="nursing-room-possible"
              error={errors.nursingRoom}
            />
            {' '}
            가능
          </label>
          <label htmlFor="nursing-room-impossible">
            <input
              {...register('nursingRoom', {
                required: { value: true, message: '수유실 사용 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="impossible"
              id="nursing-room-impossible"
            />
            {' '}
            불가능
          </label>
          <label htmlFor="nursing-room-unchecked">
            <input
              {...register('nursingRoom', {
                required: { value: true, message: '수유실 사용 가능 여부를 선택해주세요' },
              })}
              type="radio"
              value="unchecked"
              id="nursing-room-unchecked"
            />
            {' '}
            방문 전 확인 필요
          </label>
          {errors.nursingRoom && (
            <Error>{errors.nursingRoom.message}</Error>
          )}
        </RadioButtonField>
        <div>
          <ButinessHoursTitle>영업시간: </ButinessHoursTitle>
          <BusinessHoursField>
            <span>평일</span>
            <label htmlFor="weekday-start">
              <input
                {...register(
                  'weekdayStart',
                  {
                    required: { value: true, message: '평일 운영시간을 입력해주세요' },
                    pattern: { value: '[0-9]{2}:[0-9]{2}' },
                  },
                )}
                error={errors.weekdayStart}
                type="time"
                id="weekday-start"
              />
              부터
            </label>
            <label htmlFor="weekday-end">
              <input
                {...register(
                  'weekdayEnd',
                  {
                    required: { value: true, message: '평일 운영시간을 입력해주세요' },
                    pattern: { value: '[0-9]{2}:[0-9]{2}' },
                  },
                )}
                error={errors.weekdayEnd}
                type="time"
                id="weekday-end"
              />
              까지
            </label>
            {errors.weekdayStart ? (
              <Error>{errors.weekdayStart.message}</Error>
            ) : (
              errors.weekdayEnd ? (
                <Error>{errors.weekdayEnd.message}</Error>
              ) : ('')
            )}
          </BusinessHoursField>
          <BusinessHoursField>
            <span>주말</span>
            <label htmlFor="weekend-start">
              <input
                {...register(
                  'weekendStart',
                  {
                    required: { value: true, message: '주말 운영시간을 입력해주세요' },
                    pattern: { value: '[0-9]{2}:[0-9]{2}' },
                  },
                )}
                error={errors.weekendStart}
                type="time"
                id="weekend-start"
              />
              부터
            </label>
            <label htmlFor="weekend-end">
              <input
                {...register(
                  'weekendEnd',
                  {
                    required: { value: true, message: '주말 운영시간을 입력해주세요' },
                    pattern: { value: '[0-9]{2}:[0-9]{2}' },
                  },
                )}
                error={errors.weekendEnd}
                type="time"
                id="weekend-end"
              />
              까지
            </label>
            {errors.weekendStart ? (
              <Error>{errors.weekendStart.message}</Error>
            ) : (
              errors.weekendEnd ? (
                <Error>{errors.weekendEnd.message}</Error>
              ) : ('')
            )}
          </BusinessHoursField>
          <Field>
            <Label htmlFor="first-image">첫 번째 이미지: </Label>
            <input
              {...register(
                'firstImage',
                {
                  required: { value: true, message: '첫 번째 이미지를 선택해주세요' },
                },
              )}
              error={errors.firstImage}
              type="file"
              accept="image/*"
              id="first-image"
              onChange={handleFirstImageChange}
            />
            <img src={firstImageUrl} alt="" />
            {errors.firstImage && (
              <Error>{errors.firstImage.message}</Error>
            )}
          </Field>
          <Field>
            <Label htmlFor="second-image">두 번째 이미지: </Label>
            <input
              {...register(
                'secondImage',
                {
                  required: { value: true, message: '두 번째 이미지를 선택해주세요' },
                },
              )}
              error={errors.secondImage}
              type="file"
              accept="image/*"
              id="second-image"
              onChange={handleSecondImageChange}
            />
            <img src={secondImageUrl} alt="" />
            {errors.secondImage && (
              <Error>{errors.secondImage.message}</Error>
            )}
          </Field>
          <Field>
            <Label htmlFor="third-image">세 번째 이미지: </Label>
            <input
              {...register(
                'thirdImage',
                {
                  required: { value: true, message: '세 번째 이미지를 선택해주세요' },
                },
              )}
              error={errors.thirdImage}
              type="file"
              accept="image/*"
              id="third-image"
              onChange={handleThirdImageChange}
            />
            <img src={thirdImageUrl} alt="" />
            {errors.thirdImage && (
              <Error>{errors.thirdImage.message}</Error>
            )}
          </Field>
        </div>
        <SubmitButton type="submit">등록하기</SubmitButton>
        <CancelButton type="button" onClick={handleGoPrevPageClick}>취소</CancelButton>
      </form>
    </Container>
  );
}
