/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var RegisterPage = function() {

  this.nameInput = element(by.name('name'));
  this.emailInput = element(by.name('email'));
  this.passwordInput = element(by.name('password'));
  this.loginButton = element(by.css('.btn-register'));
  this.registerButton = element(by.css('.btn-login'));
  this.helpBlock = element(by.css('.help-block'));
};

module.exports = new RegisterPage();

