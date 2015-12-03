'use strict';

angular.module('calorieTrackerApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};
    $scope.userSettings = {};
    $scope.userSettings.dailyCalorieLimit = Auth.getCurrentUser().userSettings.dailyCalorieLimit;

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
    $scope.changeUserSettings = function(form) {
      $scope.userSettingsSubmitted = true;
      if(form.$valid) {
        Auth.changeUserSettings( $scope.userSettings, function(user) {
          Auth.setCurrentUser(user);
        })
         .then( function() {
            $scope.settingsMessage = 'Daily calorie limit successfully changed.';
            $scope.userSettingsSubmitted = false;
          })
          .catch( function() {
            form.dailyCalories.$setValidity('mongoose', false);
            $scope.errors.settings = 'Something went wrong, settings are not changed';
            $scope.settingsMessage = '';
          });
      }else{$scope.settingsMessage = '';}
    };
  });
