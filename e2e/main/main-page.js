/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.addNewMealButton = element(by.css('[ng-click="addNewMeal()"]'));
  this.toggleFiltersButton = element(by.model('showFilter'));
  this.clearFiltersButton = element(by.css('[ng-click="filters = {}"]'));
  this.dateFromFilterInput = element(by.model('filters.dateFrom'));
  this.dateToFilterInput = element(by.model('filters.dateTo'));
  this.newMealNameInput = element(by.model('newMeal.name'));
  this.newMealInfoInput = element(by.model('newMeal.info'));
  this.newMealCaloriesInput = element(by.model('newMeal.calories'));
  this.saveNewMealButton = element(by.css('[ng-click="addMeal()"]'));
  this.tmpEditingMealNameInput = element(by.model('tmpEditingMeal.name'));
  this.saveUpdatedMealButton = element(by.css('[ng-click="updateMeal(tmpEditingMeal)"]'));
};

module.exports = new MainPage();

