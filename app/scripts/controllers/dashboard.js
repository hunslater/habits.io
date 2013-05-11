'use strict';

angular.module('habitsApp')
  .controller('DashboardCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

    if ($rootScope.habits.length === 0) {
      $location.path('/habit');
    }



  }]);
