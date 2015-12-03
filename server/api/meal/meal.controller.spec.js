'use strict';
/**
 * GET     /meals              ->  index
 * POST    /meals              ->  create
 * GET     /meals/:id          ->  show
 * PUT     /meals/:id          ->  update
 * DELETE  /meals/:id          ->  destroy
 */

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Meal = require('./meal.model');
var User = require('../user/user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var token ='';
var userId = '';
var createdMealId = '';
var currentDateTime = new Date();

describe('Meal APIs', function() {

  before(function(done) {
    User.remove().exec().then(function () {
      Meal.remove().exec().then(function () {
        done();
      });
    });
  });

  //create user and two meals
  before(function(done) {
    new User({provider: 'local', name: 'Fake User', email: 'test@test.com', password: 'password'}).save(function(err, user) {
      if (err) done(err);
      userId = user._id;
      token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
      new Meal({userId: user._id, name : 'Fake meal1', info : 'Fake meal info1', calories: 100, dateTime: currentDateTime}).save(function(err) {
        if (err) done(err);
        new Meal({userId: user._id, name : 'Fake meal2', info : 'Fake meal info2', calories: 200, dateTime: currentDateTime}).save(function(err) {
          if (err) done(err);
          done();
        });
      });
    });
  });

  after(function(done) {
    User.remove().exec().then(function() {
      Meal.remove().exec().then(function() {
        done();
      });
    });
  });


  it('should respond with 401 when user is not logged in', function(done) {
    request(app)
      .get('/api/meals')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });


  it('should respond with JSON array containing user meals (status code: 200)',  function(done) {
   request(app)
   .get('/api/meals')
     .set('Authorization','Bearer ' + token)
     .expect(200)
     .expect('Content-Type', /json/)
     .end(function(err, res) {
       if(err) return done(err);
       res.body.should.be.instanceof(Array);
       res.body.should.have.length(2);
       done();
     });
  });

  it('should be able to create new meal (status code: 201)',  function(done) {
    request(app)
      .post('/api/meals')
      .send({name : 'Fake meal3', info : 'Fake meal info3', calories: 300, dateTime: currentDateTime})
      .set('Authorization','Bearer ' + token)
      .expect(201)
      .end(function(err, res) {
        if(err) return done(err);
        createdMealId = res.body._id;
        Meal.find({userId: userId}, function(err, meals) {
          meals.should.have.length(3);
          done();
        });
      });
  });

  it('should be able to retrieve a meal (status code: 200)',  function(done) {
    request(app)
      .get('/api/meals/' + createdMealId)
      .set('Authorization','Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) return done(err);
        res.body.should.have.property('dateTime');
        currentDateTime.getTime().should.equal(new Date(res.body.dateTime).getTime());
        res.body.should.have.property('name','Fake meal3');
        res.body.should.have.property('info', 'Fake meal info3');
        res.body.should.have.property('calories', 300);
        done();
      });
  });

  it('should be able to update meal (status code: 200)',  function(done) {
    request(app)
      .put('/api/meals/' + createdMealId)
      .send({name : 'Fake meal4', info : 'Fake meal info4', calories: 400, dateTime: currentDateTime})
      .set('Authorization','Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err) return done(err);
        currentDateTime.getTime().should.equal(new Date(res.body.dateTime).getTime());
        res.body.should.have.property('name','Fake meal4');
        res.body.should.have.property('info', 'Fake meal info4');
        res.body.should.have.property('calories', 400);
        done();
      });
  });

   it('should be able to delete meal (status code: 204)',  function(done) {
    request(app)
      .delete('/api/meals/' + createdMealId)
      .set('Authorization','Bearer ' + token)
      .expect(204)
      .end(function(err, res) {
        if(err) return done(err);
        Meal.find({userId: userId}, function(err, meals) {
          meals.should.have.length(2);
          done();
        });
      });
  });
});
