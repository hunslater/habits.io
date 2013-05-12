'use strict';

angular.module('habitsApp')
  .controller('HabitCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'habits',
    'randomHabit',
    function ($scope, $routeParams, $location, habits, randomHabit) {

      if (angular.isString($routeParams.id)) {
        var id = parseInt($routeParams.id, 10);
        if (habits.checkId(id)) {
          return $location.path('/habit');
        }
        $scope.id = id;
        var habit = habits.getHabit($scope.id);
        $scope.name = habit.name;
        $scope.sentiment = habit.sentiment;
      }

      var exampleHabit = randomHabit();
      $scope.placeholder = exampleHabit[1];

      $scope.update = function (id, name, sentiment) {
        if (!id && id !== 0) {
          habits.addHabit(name, sentiment);
          $scope.id = null;
          $scope.name = '';
          var exampleHabit = randomHabit();
          $scope.placeholder = exampleHabit[1];
          return;
        }
        habits.editHabit(id, name, sentiment);
        $location.path('/habit');
      };

      $scope.del = function (id, name) {
        // todo look at using a custom confirm box
        if (window.confirm('Are you sure you want to delete "' + name + '"?')) {
          habits.delHabit(id);
        }
      };

    }
  ]);
