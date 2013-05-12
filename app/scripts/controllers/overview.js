'use strict';

angular.module('habitsApp')
  .controller('OverviewCtrl', ['$scope', '$location', 'habits', function ($scope, $location, habits) {

    $scope.clearData = function () {
      if (confirm('Are you sure you want to clear all saved data?')) {
        habits.clearData();
        $location.path('/');
      }
    };

  }]);
