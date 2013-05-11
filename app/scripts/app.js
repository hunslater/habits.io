'use strict';

angular.module('habitsApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/habit', {
        templateUrl: 'views/habits.html',
        controller: 'HabitCtrl'
      })
      .when('/habit/:id', {
        templateUrl: 'views/habits.html',
        controller: 'HabitCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/overview', {
        templateUrl: 'views/overview.html',
        controller: 'OverviewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(['$rootScope', 'storage', '$location', function ($rootScope, store, $location) {

    $rootScope.habits = store.get('habits');
    if (!$rootScope.habits) {
      $location.path('/');
    }

    function save () {
      store.add('habits', $rootScope.habits);
    }

    $rootScope.updateStore = save;

    function checkId (id) {
      return !angular.isNumber(id) || (id < 0) || (id > $rootScope.habits.length - 1);
    }

    var goodBadRe = /^good$|^bad$/;

    $rootScope.habit = {

      add: function (name, sentiment) {
        if (!goodBadRe.test(sentiment)) { return; }
        $rootScope.habits.push({
          name: name,
          sentiment: sentiment,
          logs: {}
        });
        save();
      },

      del: function (id) {
        if (checkId(id)) { return; }
        $rootScope.habits.splice(id, 1);
        save();
      },

      edit: function (id, name, sentiment) {
        if (checkId(id)) { return; }
        if (!goodBadRe.test(sentiment)) { return; }
        $rootScope.habits[id].name = name;
        $rootScope.habits[id].sentiment = sentiment;
        save();
      },

      log: {

        add: function (id, date) {
          if (checkId(id)) { return; }
          if (!angular.isNumber(id) || (id < 0) || (id > $rootScope.habits.length - 1)) { return; }
          if (!angular.isDate(date)) { return; }
          var key = date.valueOf();
          var current = $rootScope.habits[id].logs[key];
          $rootScope.habits[id].logs[key] = angular.isNumber(current) ? current + 1: 1;
          save();
        },

        update: function (id, date, amount) {
          if (checkId(id)) { return; }
          if (!angular.isDate(date)) { return; }
          if (!angular.isNumber(amount) || (amount < 0)) { return; }
          var key = date.valueOf() + '';
          $rootScope.habits[id].logs[key] = amount;
          save();
        }

      }

    };
  }]);
