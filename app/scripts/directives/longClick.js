'use strict';

angular.module('habitsApp')
  .directive('longClick', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        function run () {
          scope.$apply(attrs.longClick);
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
          if (fired) {
            run();
          }
          fired = false;
        });

      }
    };
  });
