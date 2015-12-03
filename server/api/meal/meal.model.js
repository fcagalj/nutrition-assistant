'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MealSchema = new Schema({
  name: String,
  info: String,
  calories: Number,
  dateTime: {type: Date},
  active: Boolean,
  userId: {type: String}
});

/**
 * Validations
 */
var validatePresenceOf = function(value) {
  return value && value.length;
};

MealSchema
  .path('name')
  .validate(function(name) {
    return validatePresenceOf(name);
  }, 'meal can not be saved without name.');


MealSchema
  .path('dateTime')
  .validate(function(dateTime) {
    return validatePresenceOf(dateTime);
  }, 'meal can not be saved without date/time.');

MealSchema
  .path('calories')
  .validate(function(calories) {
    return validatePresenceOf(calories);
  }, 'meal can not be saved without calories entered.');


module.exports = mongoose.model('Meal', MealSchema);
