'use strict';

describe('Controller: MainCtrl', function () {
  var $httpBackend, MainCtrl, scope, meals;

  beforeEach(module('calorieTrackerApp'));

  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  beforeEach(function () {
      meals= [{_id: 1, name : 'meal1', info : 'lunch, it was fine', calories: 450, dailyCalories: 1000, dateTime: new Date()},
        {_id: 2, name : 'meal2', info : 'dinner', calories: 500, dailyCalories: 1000, dateTime: new Date()},
        {_id: 3, name : 'meal3', info : 'some vegetables', calories: 300, dailyCalories: 1000, dateTime: new Date()}
      ];
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should send GET request to "/api/meals" and store response to scope.meals ', function () {
    $httpBackend.expectGET('/api/meals').respond(200, [meals[0], meals[1]]);
    expect(scope.meals.length).toBe(0);
    $httpBackend.flush();
    expect(scope.meals.length).toBe(2);
  });

  it('function addMeal() should send POST request to "/api/meals" and on success add new meal as first in scope.meals', function () {
    $httpBackend.expectGET('/api/meals').respond(200, [meals[0], meals[1]]);
    $httpBackend.flush();
    $httpBackend.expectPOST('/api/meals').respond(201, meals[2]); //post request should be made to '/api/meals'
    scope.newMeal = meals[2];
    scope.addMeal();
    expect(scope.meals.length).toBe(2);
    $httpBackend.flush();
    expect(scope.meals.length).toBe(3); //new meal should be added to $scope.meals
    expect(scope.meals[0].name).toEqual('meal3'); //new meal should be inserted in the front of $scope.meals
  });

  it('function updateMeal(meal) should send PUT request to "/api/meals/:id" and on success update corresponding meal in scope.meals', function () {
    $httpBackend.expectGET('/api/meals').respond(200, [meals[0], meals[1]]);
    $httpBackend.flush();
    meals[1].name = meals[2].name; //change the name of meal1
    $httpBackend.expectPUT('/api/meals/' + meals[1]._id).respond(200, meals[1]);
    scope.updateMeal(meals[1]);
    expect(scope.meals.length).toBe(2);
    expect(scope.meals[1].name).toEqual('meal2');
    $httpBackend.flush();
    expect(scope.meals.length).toBe(2); //number of meals should remain the same
    expect(scope.meals[1].name).toEqual('meal3'); //meal should be updated (name should be changed)
  });

  it('function deleteMail(meal) should send DELETE request to "/api/meals/:id" and on success delete corresponding meal from scope.meals', function () {
    $httpBackend.expectGET('/api/meals').respond(200, [meals[0], meals[1]]);
    $httpBackend.flush();
    $httpBackend.expectDELETE('/api/meals/' + scope.meals[0]._id).respond(204);
    scope.deleteMeal(scope.meals[0]);
    expect(scope.meals.length).toBe(2);
    $httpBackend.flush();
    expect(scope.meals.length).toBe(1); //first meal (meal with name 'meal1') should be deleted
    expect(scope.meals[0].name).toEqual('meal2');

  });

  it('should watch for filter.filterByDay change', function () {
    $httpBackend.expectGET('/api/meals').respond(200, [meals[0], meals[1]]);
    $httpBackend.flush();
    var tmpDate = new Date();
    expect(scope.filters.dateFrom).toBeUndefined();
    expect(scope.filters.dateTo).toBeUndefined();
    scope.filters.filterByDay = tmpDate;
    scope.$digest();
    expect(scope.filters.dateFrom).toEqual(tmpDate);
    expect(scope.filters.dateTo).toEqual(tmpDate);
  });

  it('should watch for user setting dailyCalorieLimit change', inject(function (Auth) {
    $httpBackend.expectGET('/api/meals').respond(200, [meals[0], meals[1]]);
    $httpBackend.flush();
    Auth.setCurrentUser({userSettings:{dailyCalorieLimit : 666}});
    expect(scope.dailyCalorieLimit).toBe(0);
    scope.$digest();
    expect(scope.dailyCalorieLimit).toBe(666);
  }));
});
