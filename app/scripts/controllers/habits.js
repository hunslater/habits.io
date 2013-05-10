'use strict';

angular.module('habitsApp')
  .controller('HabitCtrl', ['$scope', 'randomHabit', function ($scope, randomHabit) {
    var exampleHabit = randomHabit();
    $scope.placeholder = exampleHabit[1];
  }]);
