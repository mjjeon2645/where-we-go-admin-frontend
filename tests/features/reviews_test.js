Feature('reviews');

// 리뷰 목록 전체보기
Scenario('관리자가 회원들이 작성한 리뷰 전체 목록을 보고자 할 때(리뷰 없음)', ({ I }) => {
  // Given
  I.resetAll();
  I.setupTwoUsers();
  I.setupFivePlaces();
  I.setupAdmin();
  I.login();

  // When
  I.click('리뷰 관리');

  // Then
  I.see('리뷰 관리 > 전체');
  I.see('작성된 사용자 리뷰가 없습니다');
});

Scenario('관리자가 회원들이 작성한 리뷰 전체 목록을 보고자 할 때(리뷰 있음)', ({ I }) => {
  // Given
  I.resetAll();
  I.setupTwoUsers();
  I.setupFivePlaces();
  I.setupThreeReviews();
  I.setupAdmin();
  I.login();

  // When
  I.click('리뷰 관리');

  // Then
  I.see('No.');
  I.see('작성일');
  I.see('작성자 닉네임');
  I.see('내용');
  I.see('평점');
  I.see('장소명');
  I.see('민지룽룽');
  I.see('준형이네');
});

Scenario('관리자가 특정 회원이 작성한 리뷰의 상세 정보를 보고자 할 때', ({ I }) => {
  // Given
  I.resetAll();
  I.setupTwoUsers();
  I.setupFivePlaces();
  I.setupThreeReviews();
  I.setupAdmin();
  I.login();
  I.click('리뷰 관리');

  // When
  I.click('정말 좋았어요. 아이랑 같이가기 좋아요!!');

  // Then
  I.see('리뷰 관리 > 상세 정보');
  I.see('리뷰 고유번호');
  I.see('작성자 닉네임');
  I.see('민지룽룽');
  I.see('작성일');
  I.see('2022-12-08');
  I.see('방문일');
  I.see('2022-11-30');
  I.see('방문 장소');
  I.see('평점');
  I.see('내용');
  I.see('삭제하기');
  I.see('뒤로가기');
});

Scenario('관리자가 특정 회원이 작성한 리뷰를 삭제 하고자 할 때', ({ I }) => {
  // Given
  I.setupAll();
  I.login();
  I.click('리뷰 관리');
  I.click('정말 좋았어요. 아이랑 같이가기 좋아요!!');

  // When
  I.click('삭제하기');

  // Then
  I.see('리뷰를 삭제합니다.');
  I.see('담당자 ID: tester123');
  I.see('담당자 사번: 1212');
  I.see('사유:');
  I.see('비밀번호:');
  I.see('삭제');
});

Scenario('관리자가 리뷰 삭제 시 사유를 입력하지 않았을 때', ({ I }) => {
  // Given
  I.setupAll();
  I.login();
  I.click('리뷰 관리');
  I.click('정말 좋았어요. 아이랑 같이가기 좋아요!!');
  I.click('삭제하기');

  // When
  I.fillField('비밀번호:', 'Tester123!');
  I.click('삭제');

  // Then
  I.see('사유를 입력해주세요');
});

Scenario('관리자가 리뷰 삭제 시 비밀번호를 입력하지 않았을 때', ({ I }) => {
  // Given
  I.setupAll();
  I.login();
  I.click('리뷰 관리');
  I.click('정말 좋았어요. 아이랑 같이가기 좋아요!!');
  I.click('삭제하기');

  // When
  I.fillField('사유:', '비속어가 포함되어 있음');
  I.click('삭제');

  // Then
  I.see('비밀번호가 맞지 않습니다. 다시 확인해주세요');
});

Scenario('관리자가 모든 항목 정상 입력 후 리뷰를 삭제', ({ I }) => {
  // Given
  I.setupAll();
  I.login();
  I.click('리뷰 관리');
  I.click('정말 좋았어요. 아이랑 같이가기 좋아요!!');
  I.click('삭제하기');

  // When
  I.fillField('비밀번호:', 'Tester123!');
  I.fillField('사유:', '비속어가 포함되어 있음');
  I.click('삭제');

  // Then
  I.dontSee('정말 좋았어요. 아이랑 같이가기 좋아요!!');
  I.see('여기 완전 인생 장소예요 아이들도 좋아했답니다!');
});
