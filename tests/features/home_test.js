Feature('home');

Scenario('고객이 홈페이지 홈 화면에 접속했을 때', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('Home Page');
});
