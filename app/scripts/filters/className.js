'use strict';

angular.module('habitsApp')
  .filter('className', function () {
    return function (input, className) {
      return input ? className: ''
    };
  });
