'use strict';

describe('MainPage', function() {
  var mainPage = require('./main-page.js');
  var mealCount = 0;

  beforeEach(function () {
    browser.get('/');
  });

  beforeEach(function() {
    element.all(by.repeater('meal in meals')).count().then(function(originalCount) {
      mealCount = originalCount;
    });
  });

  it('should be able to create new meal', function () {
    for (var i=1; i<=3; i++) {
      mainPage.addNewMealButton.click();
      mainPage.newMealNameInput.sendKeys('meal ' + i);
      mainPage.newMealInfoInput.sendKeys('info ' + i);
      mainPage.newMealCaloriesInput.sendKeys(100*i);
      mainPage.saveNewMealButton.click();
      expect(element.all(by.repeater('meal in meals')).count()).toEqual(++mealCount);
    }
  });

  it('should be able to update meal', function () {
    var first = element.all(by.repeater('meal in meals')).get(0);
    var firstMealEditButton = first.element(by.css('[ng-click="editMeal(meal)"]'));
    firstMealEditButton.click();
    mainPage.tmpEditingMealNameInput.clear().then(function() {
      mainPage.tmpEditingMealNameInput.sendKeys('updated meal 3');
    });
    mainPage.saveUpdatedMealButton.click();
    expect(first.element(by.binding('meal.name')).getText()).toBe('updated meal 3');
  });

  it('should be able to delete meal', function () {
    var first = element.all(by.repeater('meal in meals')).get(0);
    var firstDeleteMealButton = first.element(by.css('[ng-click="deleteMeal(meal)"]'));
    firstDeleteMealButton.click(); //delete first meal from the list
    expect(element.all(by.repeater('meal in meals')).count()).toEqual(--mealCount);
  });

  it('should be able to toggle (show/hide) filters', function () {
    expect(element(by.model('filters.dateFrom')).isDisplayed()).toBeTruthy();
    expect(element(by.model('filters.dateTo')).isDisplayed()).toBeTruthy();
    expect(element(by.model('filters.timeFrom')).isDisplayed()).toBeTruthy();
    expect(element(by.model('filters.timeTo')).isDisplayed()).toBeTruthy();
    mainPage.toggleFiltersButton.click();
    expect(element(by.model('filters.dateFrom')).isDisplayed()).not.toBeTruthy();
    expect(element(by.model('filters.dateTo')).isDisplayed()).not.toBeTruthy();
    expect(element(by.model('filters.timeFrom')).isDisplayed()).not.toBeTruthy();
    expect(element(by.model('filters.timeTo')).isDisplayed()).not.toBeTruthy();
    mainPage.toggleFiltersButton.click();
    expect(element(by.model('filters.dateFrom')).isDisplayed()).toBeTruthy();
    expect(element(by.model('filters.dateTo')).isDisplayed()).toBeTruthy();
    expect(element(by.model('filters.timeFrom')).isDisplayed()).toBeTruthy();
    expect(element(by.model('filters.timeTo')).isDisplayed()).toBeTruthy();
  });

  it('should be able to filter meals by date', function () {
    mainPage.clearFiltersButton.click();
    mainPage.dateFromFilterInput.sendKeys("11/18/14");
    mainPage.dateToFilterInput.sendKeys("11/17/14");
    element.all(by.repeater('meal in meals')).count().then(function(count) {
      expect(count).toBe(0); // should be zero as timeTo is greater than timeFrom
    });
    mainPage.clearFiltersButton.click();
    element.all(by.repeater('meal in meals')).count().then(function(count) {
      expect(count).toBe(mealCount); // after clearing filters all meals should be there
    });
  });
});


