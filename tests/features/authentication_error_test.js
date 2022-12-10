Feature('authentication error');

Scenario('익명의 사람이 로그인 하지 않고 장소 전체 목록에 접근하려 할 때', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.amOnPage('/places');

  // Then
  I.dontSee('장소 관리 > 전체');
  I.see('Authentication Error');
  I.see('접근 권한이 없습니다. 로그인 후 이용해주세요.');
  I.see('로그인 페이지로 이동하기');

  I.click('로그인 페이지로 이동하기');
  I.see('Admin Login');
});

Scenario('익명의 사람이 로그인 하지 않고 특정 장소 상세페이지에 접근하려 할 때', ({ I }) => {
  // Given
  I.setupFivePlaces();
  I.amOnPage('/');

  // When
  I.amOnPage('/places/1');

  // Then
  I.dontSee('장소 관리 > 상세 정보');
  I.see('Authentication Error');
  I.see('접근 권한이 없습니다. 로그인 후 이용해주세요.');
});

Scenario('익명의 사람이 로그인 하지 않고 회원 전체 목록에 접근하려 할 때', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.amOnPage('/users');

  // Then
  I.dontSee('회원 관리 > 전체');
  I.see('Authentication Error');
});

Scenario('익명의 사람이 로그인 하지 않고 특정 회원 상세페이지에 접근하려 할 때', ({ I }) => {
  // Given
  I.setupTwoUsers();
  I.amOnPage('/');

  // When
  I.amOnPage('/users/1');

  // Then
  I.dontSee('회원 관리 > 상세 정보');
  I.see('Authentication Error');
});

Scenario('익명의 사람이 로그인 하지 않고 리뷰 전체 목록에 접근하려 할 때', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.amOnPage('/reviews');

  // Then
  I.dontSee('리뷰 관리 > 전체');
  I.see('Authentication Error');
});

Scenario('익명의 사람이 로그인 하지 않고 특정 리뷰 상세페이지에 접근하려 할 때', ({ I }) => {
  // Given
  I.setupThreeReviews();
  I.amOnPage('/');

  // When
  I.amOnPage('/reviews/1');

  // Then
  I.dontSee('리뷰 관리 > 상세 정보');
  I.see('Authentication Error');
});
