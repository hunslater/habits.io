'use strict';

angular.module('habitsApp')
  .directive('longClick', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        function longClickRun () {
          scope.$apply(attrs.longClick);
        }

        function shortClickRun () {
          scope.$apply(attrs.shortClick);
        }

        var wait = 500;
        var target;
        var timer = 0;
        var fired = false;

        element.bind('mousedown', function (e) {
          if (timer !== 0) { clearTimeout(timer); }
          target = e.target;
          timer = setTimeout(function () {
            fired = true;
            timer = 0;
          }, wait);
        });

        element.bind('mouseup', function (e) {
          clearTimeout(timer);
          if (e.target !== target) { return; }
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
