Feature('places');

// 장소 목록 전체보기
Scenario('관리자가 로그인했을 때 등록된 장소가 없는 경우', ({ I }) => {
  // Given
  I.setupNoPlace();

  // When
  I.login();

  // Then
  I.see('등록된 장소가 없습니다.');
});

Scenario('관리자가 로그인했을 때 등록된 장소가 5개인 경우', ({ I }) => {
  // Given
  I.setupFivePlaces();

  // When
  I.login();

  // Then
  I.see('No.');
  I.see('장소명');
  I.see('고유번호');
  I.see('주소');
  I.see('카테고리');
  I.see('총 5개');
  I.see('승준이네');
  I.see('인천 남동구 동암남로 111호');
  I.see('키즈카페');
});

// 장소 상세보기
Scenario('관리자가 로그인 한 후 특정 장소를 클릭했을 때', ({ I }) => {
  // Given
  I.setupFivePlaces();
  I.login();

  // When
  I.click('승준이네');

  // Then
  I.see('장소 관리 > 상세 정보');
  I.see('장소 고유번호');
  I.see('위도(latitude)');
  I.see('경도(longitude)');
  I.see('주소');
  I.see('장소 유형');
  I.see('전화번호');
  I.see('홈페이지');
  I.see('예약');
  I.see('주차');
  I.see('외부음식');
  I.see('수유실');
  I.see('영업시간');
  I.see('이미지 1 미리보기');
  I.see('삭제하기');
  I.see('뒤로가기');
});

Scenario('관리자가 로그인한 후 특정 장소를 클릭하여 삭제했을 때', ({ I }) => {
  // Given
  I.setupFivePlaces();
  I.login();
  I.click('승준이네');

  // When
  I.click('삭제하기');

  // Then
  I.dontSee('승준이네');
});

Scenario('관리자가 로그인한 후 특정 장소를 클릭하여 상세페이지에 들어간 뒤 뒤로가기 버튼을 눌렀을 때', ({ I }) => {
  // Given
  I.setupFivePlaces();
  I.login();
  I.click('승준이네');

  // When
  I.click('뒤로가기');

  // Then
  I.dontSee('이미지 3 미리보기');
  I.dontSee('외부음식');
  I.dontSee('수유실');
});

// 신규 장소 등록
Scenario('관리자가 로그인한 후 신규 장소를 등록하기 위해 신규 장소 추가하기 버튼을 누를 때', ({ I }) => {
  // Given
  I.amOnPage('/');
  I.login();

  // When
  I.click('신규 장소 추가하기');

  // Then
  I.see('장소 관리 > 신규 장소 추가하기');
  I.see('장소명:');
  I.see('주소:');
  I.see('주소 찾기');
  I.see('상세 주소:');
  I.see('장소 유형:');
  I.see('전화번호:');
  I.see('홈페이지:');
  I.see('주차:');
  I.see('예약:');
  I.see('외부음식:');
  I.see('수유실:');
  I.see('영업시간:');
  I.see('평일');
  I.see('주말');
  I.see('첫 번째 이미지:');
  I.see('두 번째 이미지:');
  I.see('세 번째 이미지:');
  I.see('등록하기');
  I.see('취소');
});

Scenario('관리자가 로그인한 후 정보를 입력하지 않고 장소 추가하기를 시도할 때', ({ I }) => {
  // Given
  I.amOnPage('/');
  I.login();
  I.click('신규 장소 추가하기');

  // When
  I.click('등록하기');

  // Then
  I.see('15자 이내의 장소 이름을 정확히 입력해주세요');
  I.see('연락처를 입력해주세요');
  I.see('홈페이지 주소를 입력해주세요');
  I.see('주차 가능 여부를 선택해주세요');
  I.see('예약 가능 여부를 선택해주세요');
  I.see('외부음식 반입 가능 여부를 선택해주세요');
  I.see('수유실 사용 가능 여부를 선택해주세요');
  I.see('평일 운영시간을 입력해주세요');
  I.see('주말 운영시간을 입력해주세요');
  I.see('첫 번째 이미지를 선택해주세요');
  I.see('두 번째 이미지를 선택해주세요');
  I.see('세 번째 이미지를 선택해주세요');
});

// TODO. 폼에 정보 입력 후 결과 내는 것

// 장소 삭제
Scenario('관리자가 로그인한 후 특정 장소명을 클릭한 뒤 삭제하기 버튼을 클릭할 때', ({ I }) => {
  // Given
  I.setupFivePlaces();
  I.amOnPage('/');
  I.login();
  I.click('이누네');

  // When
  I.click('삭제하기');

  // Then
  I.dontSee('이누네');
});
