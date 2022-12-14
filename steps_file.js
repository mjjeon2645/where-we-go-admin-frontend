const backdoorBaseUrl = 'http://localhost:8000/admin-backdoor';

module.exports = function () {
  return actor({
    // Setup Databases
    setupAdmin() {
      this.amOnPage(`${backdoorBaseUrl}/setup-admin`);
    },

    setupNoPlace() {
      this.amOnPage(`${backdoorBaseUrl}/setup-no-place`);
    },

    setupFivePlaces() {
      this.amOnPage(`${backdoorBaseUrl}/setup-five-places`);
    },

    setupNoUser() {
      this.amOnPage(`${backdoorBaseUrl}/setup-no-user`);
    },

    setupTwoUsers() {
      this.amOnPage(`${backdoorBaseUrl}/setup-two-users`);
    },

    setupNoReview() {
      this.amOnPage(`${backdoorBaseUrl}/setup-no-review`);
    },

    setupThreeReviews() {
      this.amOnPage(`${backdoorBaseUrl}/setup-three-reviews`);
    },

    setupAll() {
      this.resetAll();
      this.setupAdmin();
      this.setupFivePlaces();
      this.setupTwoUsers();
      this.setupThreeReviews();
    },

    // reset
    resetAll() {
      this.amOnPage(`${backdoorBaseUrl}/reset-all`);
    },

    // login
    login() {
      this.amOnPage(`${backdoorBaseUrl}/setup-admin`);
      this.amOnPage('/');
      this.fillField('#input-admin-id', 'tester123');
      this.fillField('#input-password', 'Tester123!');
      this.click('로그인');
    },
  });
};
