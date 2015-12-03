/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Meal = require('../api/meal/meal.model');
var today = new Date();
var tom1 = new Date();
var tom2 = new Date();
var tom3 = new Date();
var tom4 = new Date();
var tom5 = new Date();
var tom6 = new Date();
tom1.setDate(today.getDate()+1);
tom1.setHours(today.getHours()+1);
tom2.setDate(today.getDate()+2);
tom2.setHours(today.getHours()+2);
tom3.setDate(today.getDate()+3);
tom3.setHours(today.getHours()+3);
tom4.setDate(today.getDate()+4);
tom4.setHours(today.getHours()+4);
tom5.setDate(today.getDate()+5);
tom5.setHours(today.getHours()+5);
tom6.setDate(today.getDate()+6);
tom6.setHours(today.getHours()+6);


/*User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    userSettings: {dailyCalorieLimit: 1000}
    }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    userSettings: {dailyCalorieLimit: 1000}
    }, function() {
      console.log('finished populating users jure');
    }
  );
});*/

Meal.find({}).remove(function() {
  Meal.create({
    name : 'meal1',
    info : 'lunch, it was fine',
    calories: 450,
    dateTime: tom1
  }, {
    name : 'meal2',
    info : 'dinner',
    calories: 500,
    dateTime: tom2
  }, {
    name : 'meal3',
    info : 'great breakfast',
    calories: 700,
    dateTime: tom3
  }, function() {
    console.log('finished populating meals');
  });
});
