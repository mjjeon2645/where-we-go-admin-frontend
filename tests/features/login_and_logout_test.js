Feature('login, logout');

Scenario('관리자가 홈페이지 홈 화면(로그인 페이지)에 접속했을 때', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('Admin Login');
  I.see('로그인');
  I.see('어드민 계정 생성하기');
});

Scenario('관리자가 로그인에 성공했을 때', ({ I }) => {
  // Given
  I.setupAdmin();
  I.setupFivePlaces();
  I.amOnPage('/');

  // When
  I.fillField('#input-admin-id', 'tester123');
  I.fillField('#input-password', 'Tester123!');
  I.click('로그인');

  // Then
  I.see('장소 관리 > 전체');
  I.see('신규 장소 추가하기');
  I.see('사원번호: 1212');
  I.see('회원 관리');
  I.see('리뷰 관리');
  I.see('로그아웃');
});

Scenario('관리자가 아이디, 비밀번호를 전혀 입력하지 않은 경우', ({ I }) => {
  // Given
  I.setupAdmin();
  I.amOnPage('/');

  // When
  I.click('로그인');

  // Then
  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 입력하지 않고 로그인을 시도할 경우', ({ I }) => {
  // Given
  I.setupAdmin();
  I.amOnPage('/');

  // When
  I.fillField('#input-admin-id', 'tester123');
  I.click('로그인');

  // Then
  I.see('비밀번호를 입력해주세요');
});

Scenario('아이디, 비밀번호가 정확하지 않을 때', ({ I }) => {
  // Given
  I.setupAdmin();
  I.amOnPage('/');

  // When
  I.fillField('#input-admin-id', 'tester13');
  I.fillField('#input-password', 'xxx');
  I.click('로그인');

  // Then
  I.see('입력하신 정보가 정확하지 않습니다. 아이디와 비밀번호를 다시 확인해주세요.');
});

// 로그아웃
Scenario('관리자가 서비스 사용을 종료하고 로그아웃 할 때', ({ I }) => {
  // Given
  I.login();

  // When
  I.click('로그아웃');

  // Then
  I.dontSee('장소 관리');
  I.dontSee('회원 관리');
  I.see('Admin Login');
  I.see('로그인');
});
