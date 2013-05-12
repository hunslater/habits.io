'use strict';

angular.module('habitsApp')
  .directive('dragX', function () {
    return {
      restrict: 'A',
      controller: ['$rootScope', '$scope', function ($rootScope, $scope) {

      }],
      link: function postLink(scope, element, attrs) {

        var maxLeft = 0;
        var minLeft = -884; // 1204 - 320
        var start = -442;
        scope.moveLeft = start;

        function changeLeft (amount) {
          var now = scope.moveLeft;
          var total = now - amount;
          if (total > maxLeft) {
            return scope.moveLeft = maxLeft;
          }
          if (total < minLeft) {
            return scope.moveLeft = minLeft;
          }
          return scope.moveLeft = total;
        }

        var finger = 0;

        element.bind('touchstart', function (e) {
          finger = e.touches[0].screenX;
        }, true);

        element.bind('touchmove', function (e) {
          var x = e.touches[0].screenX;
          if (finger === x) { return; }
          element.css('left',  changeLeft(finger - x) + 'px');
        }, true);

        element.bind('touchend', function (e) {
          finger = 0;
        }, true);

      }
    };
  });
