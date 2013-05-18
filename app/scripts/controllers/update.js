'use strict';

angular.module('habitsApp')
  .controller('UpdateCtrl', ['$scope', '$rootScope', 'habits', function ($scope, $rootScope, habits) {

    $scope.updateDisplay = false;

    $rootScope.updateHabit = function (id, name, sentiment, date, dateStr, count, cb) {
      $scope.updateDisplay = true;
      $scope.id = id;
      $scope.name = name;
      $scope.sentiment = sentiment;
      $scope.date = date;
      $scope.dateStr = dateStr;
      $scope.count = count;
      $scope.cb = cb;
    };

    $scope.numbers = [];
    for (var i = 0; i < 51; i++) {
      $scope.numbers.push(i);
    }

    $scope.updateDay = function (amount) {
      var newAmount = parseInt(amount, 10);
      habits.updateLog($scope.id, $scope.date, newAmount);
      if (angular.isFunction($scope.cb)) { $scope.cb(); }
      $scope.updateDisplay = false;
    };

    $scope.close = function () {
      $scope.updateDisplay = false;
    };

  }]);
