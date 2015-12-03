'use strict';

describe('LoginPage', function() {
  var loginPage = require('./login-page.js');

  beforeEach(function() {
    browser.get('/login');
  });

  it('should be able to log in', function() {
    loginPage.emailInput.sendKeys('jure@jure.com');
    loginPage.passwordInput.sendKeys('jure');
    loginPage.loginButton.click();
    if (!loginPage.helpBlock.isPresent())
      expect(element(by.css('.navbar-text')).getText()).toBe('Hello jure');
  });
});
