'use strict';

angular.module('habitsApp')
  .directive('dragX', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {

        var maxLeft = 0;
        var minLeft = -884; // 1204 - 320
        var start = -442;

        function changeLeft (amount) {
          var now = parseInt(element.css('left'), 10) || start;
          var total = now - amount;
          if (total > maxLeft) {
            return maxLeft;
          }
          if (total < minLeft) {
            return minLeft;
          }
          return total;
        }

        var finger = 0;

        element.bind('touchstart', function (e) {
          finger = e.touches[0].screenX;
        }, true);

        element.bind('touchmove', function (e) {
          var x = e.touches[0].screenX;
          if (finger === x) { return; }
          element.css('left',  changeLeft(finger - x) + 'px');
          finger = x;
        }, true);

        element.bind('touchend', function () {
          finger = 0;
        }, true);

      }
    };
  });
