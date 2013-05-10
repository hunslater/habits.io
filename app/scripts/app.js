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
  });
