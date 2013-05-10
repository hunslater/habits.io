'use strict';

angular.module('habitsApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

    if (angular.isArray($rootScope.habits)) {
      $location.path('/dashboard');
    }

    $scope.start = function () {
      $rootScope.habits = [];
      $rootScope.logs = {};
      $location.path('/habit');
    };


  }]);
