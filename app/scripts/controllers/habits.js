'use strict';

angular.module('habitsApp')
  .controller('HabitCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'randomHabit', function ($scope, $rootScope, $routeParams, $location, randomHabit) {

    if (angular.isString($routeParams.id)) {
      var id = parseInt($routeParams.id, 10);
      if ((id < 0) || ($scope.id > $rootScope.habits.length - 1)) {
        return $location.path('/habit');
      }
      $scope.id = id;
      var habit = $rootScope.habits[$scope.id];
      $scope.name = habit.name;
      $scope.sentiment = habit.sentiment;
    }

    var exampleHabit = randomHabit();
    $scope.placeholder = exampleHabit[1];

    $scope.update = function (id, name, sentiment) {
      if (!id) {
        $rootScope.habit.add(name, sentiment);
        $scope.id = null;
        $scope.name = '';
        var exampleHabit = randomHabit();
        $scope.placeholder = exampleHabit[1];
        return;
      }
      $rootScope.habit.edit(id, name, sentiment);
      $location.path('/habit');
    };

    $scope.del = function (id, name) {
      // todo look at using a custom confirm box
      if (window.confirm('Are you sure you want to delete "' + name + '"?')) {
        $rootScope.habit.del(id);
      }
    };

  }]);
