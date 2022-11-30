/* eslint-disable react/jsx-props-no-spreading */

import Postcode from './Postcode';

export default function NewPlaceForm({
  register, handleSubmit, errors, onSubmit,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="place-name">장소명</label>
          <input
            id="place-name"
            placeholder="15자 이내 작성 가능"
            {...register('placeName', {
              required: { value: true, message: '장소명을 입력해주세요' },
              maxLength: 15,
            })}
            error={errors.placeName}
          />
          {errors.placeName && (
            <p>{errors.placeName.message}</p>
          )}
        </div>
        <div>
          <Postcode />
        </div>
        <div>
          <label htmlFor="place-category">장소 유형</label>
          <select {...register('category')}>
            <option value="select" hidden selected disabled>선택</option>
            <option value="sports">스포츠/레저</option>
            <option value="education">교육/체험</option>
            <option value="camping">숙박/캠핑</option>
            <option value="exhibition">전시/공연</option>
            <option value="nature">자연</option>
            <option value="kids-cafe">키즈카페</option>
            <option value="food">키즈존 맛집</option>
            <option value="site">유적지</option>
          </select>
        </div>
        <div>
          <p>연락처</p>
          <label htmlFor="place-phone">전화번호</label>
          <input id="place-phone" {...register('phone')} />
          <label htmlFor="place-homepage">홈페이지</label>
          <input id="place-homepage" {...register('homepage')} />
        </div>
        <p>편의시설</p>
        <div>
          <p>주차</p>
          <label htmlFor="parking-possible">
            <input
              {...register('parking', { required: true })}
              type="radio"
              value="possible"
              id="parking-possible"
            />
            {' '}
            가능
          </label>
          <label htmlFor="parking-impossible">
            <input
              {...register('parking', { required: true })}
              type="radio"
              value="impossible"
              id="parking-impossible"
            />
            {' '}
            불가능
          </label>
          <label htmlFor="parking-unchecked">
            <input
              {...register('parking', { required: true })}
              type="radio"
              value="unchecked"
              id="parking-unchecked"
            />
            {' '}
            방문 전 확인 필요
          </label>
        </div>
        <div>
          <p>예약</p>
          <label htmlFor="reservation-possible">
            <input
              {...register('reservation', { required: true })}
              type="radio"
              value="possible"
              id="reservation-possible"
            />
            {' '}
            가능
          </label>
          <label htmlFor="reservation-impossible">
            <input
              {...register('reservation', { required: true })}
              type="radio"
              value="impossible"
              id="reservation-impossible"
            />
            {' '}
            불가능
          </label>
          <label htmlFor="reservation-unchecked">
            <input
              {...register('reservation', { required: true })}
              type="radio"
              value="unchecked"
              id="reservation-unchecked"
            />
            {' '}
            방문 전 확인 필요
          </label>
        </div>
        <div>
          <p>외부음식</p>
          <label htmlFor="outdoorfood-possible">
            <input
              {...register('outdoorfood', { required: true })}
              type="radio"
              value="possible"
              id="outdoorfood-possible"
            />
            {' '}
            가능
          </label>
          <label htmlFor="outdoorfood-impossible">
            <input
              {...register('outdoorfood', { required: true })}
              type="radio"
              value="impossible"
              id="outdoorfood-impossible"
            />
            {' '}
            불가능
          </label>
          <label htmlFor="outdoorfood-unchecked">
            <input
              {...register('outdoorfood', { required: true })}
              type="radio"
              value="unchecked"
              id="outdoorfood-unchecked"
            />
            {' '}
            방문 전 확인 필요
          </label>
        </div>
        <div>
          <p>수유실</p>
          <label htmlFor="nursingroom-possible">
            <input
              {...register('nursingroom', { required: true })}
              type="radio"
              value="possible"
              id="nursingroom-possible"
            />
            {' '}
            가능
          </label>
          <label htmlFor="nursingroom-impossible">
            <input
              {...register('nursingroom', { required: true })}
              type="radio"
              value="impossible"
              id="nursingroom-impossible"
            />
            {' '}
            불가능
          </label>
          <label htmlFor="nursingroom-unchecked">
            <input
              {...register('nursingroom', { required: true })}
              type="radio"
              value="unchecked"
              id="nursingroom-unchecked"
            />
            {' '}
            방문 전 확인 필요
          </label>
        </div>
        <div>
          <p>영업시간</p>
          <div>
            <p>평일</p>
            <label htmlFor="weekday-start">
              <input
                {...register(
                  'weekday-start',
                  {
                    required: { value: true },
                    pattern: { value: '[0-9]{2}:[0-9]{2}' },
                  },
                )}
                type="time"
                id="weekday-start"
              />
              부터
            </label>
            <label htmlFor="weekday-end">
              <input
                {...register(
                  'weekday-end',
                  {
                    required: { value: true },
                    pattern: { value: '[0-9]{2}:[0-9]{2}' },
                  },
                )}
                type="time"
                id="weekday-end"
              />
              까지
            </label>
          </div>
          <div>
            <p>주말</p>
            <label htmlFor="weekend-start">
              <input
                {...register(
                  'weekend-start',
                  {
                    required: { value: true },
                    pattern: { value: '[0-9]{2}:[0-9]{2}' },
                  },
                )}
                type="time"
                id="weekend-start"
              />
              부터
            </label>
            <label htmlFor="weekend-end">
              <input
                {...register(
                  'weekend-end',
                  {
                    required: { value: true },
                    pattern: { value: '[0-9]{2}:[0-9]{2}' },
                  },
                )}
                type="time"
                id="weekend-end"
              />
              까지
            </label>
          </div>
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
