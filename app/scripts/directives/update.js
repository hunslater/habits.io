'use strict';

angular.module('habitsApp')
  .directive('update', function () {
    return {
      templateUrl: 'views/update.html',
      restrict: 'E',
      controller: ['$scope', '$attrs', 'habits', function ($scope, $attrs, habits) {
        $scope.day = $attrs.date;
        $scope.count = 0;
        $scope.close = function () {
          $scope.day.show = false;
        };
        $scope.updateDay = function (count) {
          var parent = $scope.$parent;
          habits.updateLog(parent.$index, $scope.day.date, parseInt(count, 10));
          parent.update();
          $scope.day.show = false;
        };
      }],
      link: function postLink(scope, element, attrs) {
        scope.numbers = [];
        setTimeout(function (){
          scope.count = scope.day.log;
          var max = scope.count > 20 ? scope.count + 2: 20;
          for (var i = 0; i < max; i++) {
            scope.numbers.push(i);
          }
        }, 100);
      }
    };
  });
