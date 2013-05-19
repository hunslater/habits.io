'use strict';

angular.module('habitsApp')
  .directive('longClick', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        function longClickRun () {
          // for safari :(
          setTimeout(function () {
            scope.$apply(attrs.longClick);
          }, 1);
        }

        function shortClickRun () {
          scope.$apply(attrs.shortClick);
        }

        var wait = 500;
        var target;
        var timer = 0;
        var fired = false;
        var currX = 0;

        element.bind('touchstart', function (e) {
          if (timer !== 0) { clearTimeout(timer); }
          var touch = e.touches.item(0);
          target = touch.target;
          currX = touch.pageX;
          timer = setTimeout(function () {
            fired = true;
            timer = 0;
          }, wait);
        });

        element.bind('touchend', function (e) {
          clearTimeout(timer);
          var touch = e.changedTouches.item(0);
          var x = touch.pageX;
          var y = touch.pageY;
          if (document.elementFromPoint(x, y) !== target) { return; }
          if (Math.abs(x - currX) > 25) { return; };
          currX = 0;
          if (fired) {
            longClickRun();
          } else  {
            shortClickRun();
          }
          fired = false;
        });

      }
    };
  });
