'use strict';

var app = angular.module('habitsApp');

app.value('localStorage', window.localStorage);

app.constant('prefix', 'ls');

app.factory('storage', ['localStorage', 'prefix', function (localStorage, prefix) {

  return {

    get: function (key) {
      return JSON.parse(localStorage.getItem(prefix + '.' + key));
    },

    add: function (key, val) {
      localStorage.setItem(prefix + '.' + key, JSON.stringify(val));
    },

    clear: function () {
      localStorage.clear();
    }

  };

}]);
