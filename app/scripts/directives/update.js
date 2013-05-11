'use strict';

angular.module('habitsApp')
  .directive('update', function () {
    return {
      templateUrl: 'views/update.html',
      restrict: 'E',
      controller: ['$scope', '$attrs', function ($scope, $attrs) {
        $scope.day = $attrs.day;
        $scope.close = function () {
          $scope.day.show = false;
        }
      }],
      link: function postLink(scope, element, attrs) {
        scope.numbers = [];
        var max = 20; //scope.day.log > 20 ? scope.day.log : 20;
        for (var i = 0; i < max; i++) {
          scope.numbers.push(i);
        }
      }
    };
  });
