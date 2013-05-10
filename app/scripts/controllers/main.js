'use strict';

angular.module('habitsApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'localStorageService', '$location', function ($scope, $rootScope, store, $location) {

    var logs;
    var habits = $rootScope.habits = store.get('habits');

    if (habits) {
      habits = JSON.parse(habits);
      logs = JSON.parse(store.get('logs'));
      $location.path('/dashboard');
    }

    $scope.start = function () {
      habits = $rootScope.habits = [];
      logs = $rootScope.logs = {};
      $location.path('/habit');
    };

    $rootScope.save = function () {
      store.save('habits', JSON.stringify($rootScope.habits));
      store.save('logs', JSON.stringify($rootScope.logs));
    }

    $rootScope.habit = {
      add: function (name, sentiment) {},
      del: function (id) {},
      edit: function (id, name, sentiment) {}
    };

  }]);
