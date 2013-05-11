'use strict';

angular.module('habitsApp')
  .controller('DashboardCtrl', ['$scope', '$location', 'habits', function ($scope, $location, habits) {

    if (habits.hasHabits()) {
      $location.path('/habit');
    }

  }]);
