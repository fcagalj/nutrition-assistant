'use strict';

describe('Service: dateService', function () {

  // load the service's module
  beforeEach(module('calorieTrackerApp'));

  // instantiate service
  var dateService;
  beforeEach(inject(function (_dateService_) {
    dateService = _dateService_;
  }));

  it('should convert to date correctly', function () {
    expect(dateService.convert("1970-01-01T04:00:00") instanceof Date).toBeTruthy();
    expect(dateService.convert(2014,11,24) instanceof Date).toBeTruthy();
    expect(dateService.convert({year:2014, month: 11, date: 24}) instanceof Date).toBeTruthy();
    expect(dateService.convert(Date.now()) instanceof Date).toBeTruthy();
  });

  it('should be able to compare dates correctly', function () {
    expect(dateService.compare({year:2014, month: 11, date: 26}, {year:2014, month: 11, date: 25})).toBe(1);
    expect(dateService.compare({year:2014, month: 11, date: 25}, {year:2014, month: 11, date: 25})).toBe(0);
    expect(dateService.compare({year:2014, month: 11, date: 25}, {year:2014, month: 11, date: 26})).toBe(-1);
  });

  it('should be able to detect if date is in given range correctly', function () {
    expect(dateService.inRange({year:2014, month: 11, date: 26},{year:2014, month: 11, date: 25}, {year:2014, month: 11, date: 27})).toBeTruthy();
    expect(dateService.inRange({year:2014, month: 11, date: 28},{year:2014, month: 11, date: 25}, {year:2014, month: 11, date: 27})).not.toBeTruthy();
  });

  it('should be able to clone date object', function () {
    var tmpDate = Date.now();
    expect(tmpDate === dateService.cloneDate(tmpDate).getTime()).toBeTruthy();
  });


});

describe('Service: timeService', function () {

  // load the service's module
  beforeEach(module('calorieTrackerApp'));

  // instantiate service
  var timeService;
  beforeEach(inject(function (_timeService_) {
    timeService = _timeService_;
  }));

  it('should convert to date/time correctly', function () {
    expect(timeService.convert("1970-01-01T04:00:00") instanceof Date).toBeTruthy();
    expect(timeService.convert(2014,11,24) instanceof Date).toBeTruthy();
    expect(timeService.convert({year:2014, month: 11, date: 24}) instanceof Date).toBeTruthy();
    expect(timeService.convert(Date.now()) instanceof Date).toBeTruthy();
  });

  it('should be able to compare times correctly', function () {
    expect(timeService.compare("2014-11-25T10:00:00", "2014-11-25T09:00:00")).toBe(1);
    expect(timeService.compare("2014-11-25T10:00:00", "2014-11-25T10:00:00")).toBe(0);
    expect(timeService.compare("2014-11-25T10:00:00", "2014-11-25T11:00:00")).toBe(-1);
  });

  it('should be able to detect if time is in given range correctly', function () {
    expect(timeService.inRange("2014-11-25T10:00:00", "2014-11-25T09:00:00", "2014-11-25T11:00:00")).toBeTruthy();
    expect(timeService.inRange("2014-11-25T12:00:00", "2014-11-25T09:00:00", "2014-11-25T11:00:00")).not.toBeTruthy();
  });
});
