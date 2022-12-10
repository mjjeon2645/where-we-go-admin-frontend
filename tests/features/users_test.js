Feature('users');

// 회원 목록 전체보기
Scenario('관리자 로그인 후 회원 관리 메뉴 진입 시 등록된 회원이 없을 때', ({ I }) => {
  // Given
  I.setupNoUser();
  I.setupAdmin();
  I.login();

  // When
  I.click('회원 관리');

  // Then
  I.see('등록된 사용자가 없습니다.');
});

Scenario('관리자 로그인 후 회원 관리 메뉴 진입 시 등록된 회원이 있을 때', ({ I }) => {
  // Given
  I.setupTwoUsers();
  I.setupAdmin();
  I.login();

  // When
  I.click('회원 관리');

  // Then
  I.see('회원 관리 > 전체');
  I.see('총 2명');
  I.see('No.');
  I.see('고유번호');
  I.see('닉네임');
  I.see('이메일');
  I.see('회원가입 일자');
  I.see('인증 방식');
  I.see('민지룽룽');
  I.see('tester2@tester.com');
  I.see('2022-10-08');
  I.see('kakao');
});

// 상세보기
Scenario('관리자가 로그인한 후 특정 회원의 상세정보를 보기 위해 닉네임을 클릭', ({ I }) => {
  // Given
  I.setupTwoUsers();
  I.setupAdmin();
  I.login();
  I.click('회원 관리');

  // When
  I.click('민지룽룽');

  // Then
  I.see('회원 관리 > 상세 정보');
  I.see('사용자 고유번호');
  I.see('닉네임');
  I.see('이메일');
  I.see('소셜 로그인 아이디');
  I.see('회원가입 일자');
  I.see('인증 방식');
  I.see('가입 상태');
  I.see('가입 완료');
  I.see('회원 삭제');
  I.see('아이 정보');
  I.see('작성한 리뷰 목록');
  I.see('즐겨찾기 목록');
});

// 회원 삭제
Scenario('관리자가 특정 회원 정보를 삭제하기 위해 회원 삭제 버튼을 누를 때', ({ I }) => {
  // Given
  I.setupTwoUsers();
  I.setupAdmin();
  I.login();
  I.click('회원 관리');
  I.click('룽룽탱');

  // When
  I.click('회원 삭제');

  // Then
  I.dontSee('룽룽탱');
  I.see('민지룽룽');
});
