'use strict';

angular.module('habitsApp')
  .filter('className', function () {
    return function (bool, className) {
      return bool ? className: '';
    };
  });
