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
      link: function postLink(scope) {
        scope.numbers = [];
        for (var i = 0; i < 50; i++) {
          scope.numbers.push(i);
        }
        setTimeout(function (){
          scope.count = scope.day.log;
        }, 100);
      }
    };
  });
