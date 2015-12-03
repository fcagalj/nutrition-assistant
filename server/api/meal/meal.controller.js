'use strict';
/**
 * GET     /meals              ->  index
 * POST    /meals              ->  create
 * GET     /meals/:id          ->  show
 * PUT     /meals/:id          ->  update
 * DELETE  /meals/:id          ->  destroy
 */

var _ = require('lodash');
var Meal = require('./meal.model');

var validationError = function(res, err) {
  return res.json(422, err);
};


// Get list of meals
exports.index = function(req, res) {
  Meal.find({ userId: req.user.id }, function (err, meals) {
    if(err) { return handleError(res, err); }
    return res.json(200, meals);
  });
};

// Get a single meal
exports.show = function(req, res) {
  Meal.findById(req.params.id, function (err, meal) {
    if(err) { return handleError(res, err); }
    if(!meal) { return res.send(404); }
    return res.json(meal);
  });
};

// Creates a new meal in the DB.
exports.create = function(req, res) {
  var newMeal = new Meal(req.body);
  newMeal.userId = req.user.id;
  Meal.create(newMeal, function(err, meal) {
    if (err) return validationError(res, err);
    return res.json(201, meal);
  });
};

// Updates an existing meal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Meal.findById(req.params.id, function (err, meal) {
    if (err) {
      return handleError(res, err);
    }
    if(!meal) {
      return res.send(404);
    }
    var updated = _.merge(meal, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, meal);
    });
  });
};

// Deletes a meal from the DB.
exports.destroy = function(req, res) {
  Meal.findById(req.params.id, function (err, meal) {
    if(err) { return handleError(res, err); }
    if(!meal) { return res.send(404); }
    meal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
