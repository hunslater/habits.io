'use strict';

angular.module('habitsApp')
  .controller('MainCtrl', ['$scope', '$location', 'habits', function ($scope, $location, habits) {

    if (habits.exists()) {
      $location.path('/dashboard');
    }

    $scope.start = function () {
      habits.init();
      $location.path('/habit');
    };

  }]);
