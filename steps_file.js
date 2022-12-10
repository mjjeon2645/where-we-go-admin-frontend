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
