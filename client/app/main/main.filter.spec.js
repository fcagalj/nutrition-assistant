'use strict';

var generateTestData = function() {
  var meals = [];
  var createDate = function(day,hour) {
    day = (day<10) ? "0" + day : day;
    hour = (hour<10) ? "0" + hour : hour;
    return Date.parse("2014-11-" + day+"T" + hour + ":00:00");
  }
  for(var i=1; i<=5; i++) {
    meals.push({
      _id: 1,
      name : 'meal' + i,
      info : 'meal info' + i,
      calories: 100*i,
      dateTime: createDate(i*2,i*4)
    });
  }
  return meals;
}


describe('Filter: dateFilter', function () {
  var meals;
  // load the filter's module
  beforeEach(module('calorieTrackerApp'));

  // initialize a new instance of the filter before each test
  var dateFilter;
  beforeEach(inject(function ($filter) {
    dateFilter = $filter('dateFilter');
  }));

  //create test data (meals)
  beforeEach(function () {
    meals = generateTestData();
  });

  it('should return the input filtered by given date range"', function () {
    var filters = {};
    filters.dateFrom = Date.parse("2014-11-2");
    filters.dateTo = Date.parse("2014-11-8");
    expect(dateFilter(meals,filters).length).toBe(4);
  });

});

describe('Filter: timeFilter', function () {
  var meals;
  // load the filter's module
  beforeEach(module('calorieTrackerApp'));

  // initialize a new instance of the filter before each test
  var timeFilter;
  beforeEach(inject(function ($filter) {
    timeFilter = $filter('timeFilter');
  }));

  //create test data (meals)
  beforeEach(function () {
    meals = generateTestData();
  });

  it('should return the input filtered by given time range"', function () {
    var filters = {};
    filters.timeFrom = Date.parse("1970-01-01T04:00:00");
    filters.timeTo = Date.parse("1970-01-01T16:00:00");   //time range (04:00:00 - 16:00:00)
    expect(timeFilter(meals,filters).length).toBe(4);
  });

});

describe('Filter: calorieFilter', function () {
  var meals;
  // load the filter's module
  beforeEach(module('calorieTrackerApp'));

  // initialize a new instance of the filter before each test
  var calorieFilter;
  beforeEach(inject(function ($filter) {
    calorieFilter = $filter('calorieFilter');
  }));

  //create test data (meals)
  beforeEach(function () {
    meals = generateTestData();
  });

  it('should compose all filters and return filtered input"', function () {
    var filters = {};
    filters.dateFrom = Date.parse("2014-11-2");          //date range (2 - 8)
    filters.dateTo = Date.parse("2014-11-8");
    filters.timeFrom = Date.parse("1970-01-01T10:00:00");
    filters.timeTo = Date.parse("1970-01-01T16:00:00");   //time range (10:00:00 - 16:00:00)
    expect(calorieFilter(meals,filters).length).toBe(2);
  });

});

