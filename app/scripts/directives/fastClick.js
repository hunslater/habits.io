'use strict';

angular.module('habitsApp')
  .directive('fastClick', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var wait = 500;
        var target;
        var timer = 0;
        var fired = false;

        element.bind('touchstart', function (e) {
          if (timer !== 0) { clearTimeout(timer); }
          target = e.touches.item(0).target;
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
          scope.$apply(attrs.fastClick);
          fired = false;
        });

      }
    };
  });

