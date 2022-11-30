/* eslint-disable react/jsx-props-no-spreading */

export default function NewPlaceForm({
  register, handleSubmit, errors, onSubmit,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="place-name">장소명</label>
          <input id="place-name" {...register('placeName')} />
        </div>
        <div>
          <label htmlFor="place-address">주소</label>
          <input id="place-address" {...register('fullAddress')} />
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
          <input type="radio" id="possible1" value="possible" name="parking" defaultChecked />
          <label htmlFor="possible1">가능</label>
          <input type="radio" id="impossible1" value="impossible" name="parking" />
          <label htmlFor="impossible1">불가능</label>
          <input type="radio" id="unchecked1" value="unchecked" name="parking" />
          <label htmlFor="unchecked1">방문 전 확인</label>
        </div>
        <div>
          <p>예약</p>
          <input type="radio" id="possible2" value="possible" name="reservation" defaultChecked />
          <label htmlFor="possible2">가능</label>
          <input type="radio" id="impossible2" value="impossible" name="reservation" />
          <label htmlFor="impossible2">불가능</label>
          <input type="radio" id="unchecked2" value="unchecked" name="reservation" />
          <label htmlFor="unchecked2">방문 전 확인</label>
        </div>
        <div>
          <p>외부음식</p>
          <input type="radio" id="possible3" value="possible" name="outdoor-food" defaultChecked />
          <label htmlFor="possible3">가능</label>
          <input type="radio" id="impossible3" value="possible" name="outdoor-food" />
          <label htmlFor="impossible3">불가능</label>
          <input type="radio" id="unchecked3" value="possible" name="outdoor-food" />
          <label htmlFor="unchecked3">방문 전 확인</label>
        </div>
        <div>
          <p>수유실</p>
          <input type="radio" id="possible4" value="possible" name="nursing-room" defaultChecked />
          <label htmlFor="possibl4e">가능</label>
          <input type="radio" id="impossible4" value="possible" name="nursing-room" />
          <label htmlFor="impossible4">불가능</label>
          <input type="radio" id="unchecked4" value="possible" name="nursing-room" />
          <label htmlFor="unchecked4">방문 전 확인</label>
        </div>
        <div>
          영업시간
          <div>
            <p>월요일 : </p>
            <input id="monday-start" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            {' '}
            <label htmlFor="monday-start">부터</label>
            {' '}
            <input id="monday-end" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            <label htmlFor="monday-end">까지</label>
          </div>
          <div>
            <p>화요일 : </p>
            <input id="tuesday-start" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            {' '}
            <label htmlFor="tuesday-start">부터</label>
            {' '}
            <input id="tuesday-end" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            <label htmlFor="tuesday-end">까지</label>
          </div>
          <div>
            <p>수요일 : </p>
            <input id="wednesday-start" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            {' '}
            <label htmlFor="wednesday-start">부터</label>
            {' '}
            <input id="wednesday-end" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            <label htmlFor="wednesday-end">까지</label>
          </div>
          <div>
            <p>목요일 : </p>
            <input id="thursday-start" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            {' '}
            <label htmlFor="thursday-start">부터</label>
            {' '}
            <input id="thursday-end" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            <label htmlFor="thursday-end">까지</label>
          </div>
          <div>
            <p>금요일 : </p>
            <input id="friday-start" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            {' '}
            <label htmlFor="friday-start">부터</label>
            {' '}
            <input id="friday-end" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            <label htmlFor="friday-end">까지</label>
          </div>
          <div>
            <p>토요일 : </p>
            <input id="saturday-start" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            {' '}
            <label htmlFor="saturday-start">부터</label>
            {' '}
            <input id="saturday-end" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            <label htmlFor="saturday-end">까지</label>
          </div>
          <div>
            <p>일요일 : </p>
            <input id="sunday-start" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            {' '}
            <label htmlFor="sunday-start">부터</label>
            {' '}
            <input id="sunday-end" type="time" required pattern="[0-9]{2}:[0-9]{2}" />
            <label htmlFor="sunday-end">까지</label>
          </div>
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
