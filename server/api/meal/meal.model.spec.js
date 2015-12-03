'use strict';

var should = require('should');
var app = require('../../app');
var Meal = require('./meal.model');

var createMeal = function() {
  return new Meal({
    name : 'Fake meal',
    info : 'Fake meal info',
    calories: 100,
    dateTime: new Date()
  });
};

describe('Meal Model', function() {

  before(function(done) {
    Meal.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Meal.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no meals', function(done) {
    Meal.find({}, function(err, meals) {
      meals.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a meal without data/time entered', function(done) {
    var meal = createMeal();
    meal.dateTime = null;
    meal.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a meal without name entered', function(done) {
    var meal = createMeal();
    meal.name = '';
    meal.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a meal without calories entered', function(done) {
    var meal = createMeal();
    meal.calories = null;
    meal.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should pass when all mandatory data are provided', function(done) {
    var meal = createMeal();
    meal.save(function(err) {
      should.not.exist(err);
      done();
    });
  });
});
