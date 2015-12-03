'use strict';

describe('RegisterPage', function() {
  var registerPage = require('./register-page.js');

  beforeEach(function() {
    browser.get('/signup');
  });

  it('should be able to log in', function() {
    registerPage.nameInput.sendKeys('jure');
    registerPage.emailInput.sendKeys('jure@jure.com');
    registerPage.passwordInput.sendKeys('jure');
    registerPage.registerButton.click();
    if (!registerPage.helpBlock.isPresent())
      expect(element(by.css('.navbar-text')).getText()).toBe('Hello jure');
  });
});
