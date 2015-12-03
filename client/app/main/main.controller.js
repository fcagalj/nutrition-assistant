'use strict';

angular.module('calorieTrackerApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.meals = [];
    $scope.filters = {};
    $scope.dailyCalorieLimit = 0;
    $scope.showFilter = true;
    $scope.addingNew = false;
    $scope.newMeal = {};
    $scope.tmpEditingMeal = {};
    $scope.Date = new Date();


    $http.get('/api/meals').success(function(meals) {
      $scope.meals = meals;
      recalculateCalories();
    });

    $scope.addMeal = function() {
      if($scope.newMeal === undefined) {
        return;
      }
      $http.post('/api/meals', $scope.newMeal).success(function(meal) {
        $scope.meals.unshift(meal);
        $scope.newMeal = '';
        $scope.addingNew = false;
        $scope.newMeal = {};
        recalculateCalories();
      });
    };

    $scope.updateMeal = function(meal) {
      if(meal === undefined) {
        return;
      }
      $http.put('/api/meals/' + meal._id, meal).success(function(meal) {
        angular.forEach($scope.meals, function(u, i) {
          if (u._id === meal._id) {
            $scope.meals[i] = meal;
            meal.$editing= false;
          }
        });
        recalculateCalories();
      });
    };

    $scope.deleteMeal = function(meal) {
      $http.delete('/api/meals/' + meal._id).success(function() {
        angular.forEach($scope.meals, function(u, i) {
          if (u === meal) {
            $scope.meals.splice(i, 1);
          }
        });
        recalculateCalories();
      });
    };

    $scope.addNewMeal = function() {
      $scope.newMeal.dateTime = new Date();
      $scope.addingNew=true;
    };

    $scope.editMeal = function(meal) {
      $scope.tmpEditingMeal = JSON.parse(JSON.stringify(meal));
      meal.$editing = true;
    };

    $scope.cancelEditing = function(meal) {
      $scope.tmpEditingMeal = {};
      meal.$editing = false;
    };

    var recalculateCalories = function() {
      angular.forEach($scope.meals, function(meal) {
        var tmp = 0;
        angular.forEach($scope.meals, function(m) {
          var d1 = new Date(meal.dateTime);
          var d2 = new Date(m.dateTime);
          if (d1.getYear() === d2.getYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) {
            tmp += m.calories;
          }
        });
        meal.dailyCalories = tmp;
      });
    };

    $scope.$watch(Auth.getCurrentUser, function(newVal) {
      if (newVal !== undefined && newVal.userSettings!== undefined) {
        $scope.dailyCalorieLimit  = newVal.userSettings.dailyCalorieLimit;
      }
    },true);

    $scope.$watch('filters.filterByDay', function(newVal) {
      if (newVal !== undefined) {
          $scope.filters.dateFrom = newVal;
          $scope.filters.dateTo = newVal;
      }
    });
  });
