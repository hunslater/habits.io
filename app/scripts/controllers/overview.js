'use strict';

angular.module('habitsApp')
  .controller('OverviewCtrl', ['$scope', '$location', 'habits', function ($scope, $location, habits) {

    $scope.clearData = function () {
      if (confirm('Are you sure you want to clear all saved data?')) {
        habits.clearData();
        $location.path('/');
      }
    };

    $scope.chartTypes = [
      [7, '1 week'],
      [14, '2 weeks'],
      [30, '1 month'],
      [90, '3 months']
    ];

    $scope.chartShowing = 7;

    $scope.updateChart = function (number) {
      $scope.chartShowing = number;
    }

  }]);
