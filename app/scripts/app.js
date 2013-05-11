'use strict';

angular.module('habitsApp', ['LocalStorageModule'])
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
  }).run(['$rootScope', 'localStorageService', '$location', function ($rootScope, store, $location) {

    var habitsStr = store.get('habits');
    if (!habitsStr) {
      $location.path('/');
    }

    $rootScope.habits = JSON.parse(habitsStr);
    $rootScope.logs = JSON.parse(store.get('logs'));


    function save () {
      store.add('habits', JSON.stringify($rootScope.habits));
      store.add('logs', JSON.stringify($rootScope.logs));
    }

    $rootScope.updateStore = save;

    var goodBadRe = /^good$|^bad$/;

    $rootScope.habit = {

      add: function (name, sentiment) {
        if (!goodBadRe.test(sentiment)) { return; }
        $rootScope.habits.push({
          name: name,
          sentiment: sentiment
        });
        save();
      },

      del: function (id) {
        if ((id < 0) || (id > $rootScope.habits.length - 1)) { return; }
        $rootScope.habits.splice(id, 1);
        save();
      },

      edit: function (id, name, sentiment) {
        if ((id < 0) || (id > $rootScope.habits.length - 1)) { return; }
        $rootScope.habits[id] = {
          name: name,
          sentiment: sentiment
        };
        save();
      }

    };
  }]);
