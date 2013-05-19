'use strict';

angular.module('habitsApp')
  .directive('chart', function () {
    return {
      template: '<canvas width="280" height="280"></canvas>',
      replace: true,
      restrict: 'E',
      controller: ['$scope', 'habits', function ($scope, habits) {

        var out = habits.export();
        var good = out.good;
        var bad = out.bad;
        var labels = out.labels;
        var blank = out.blank;

        var red = '220, 50, 47';
        var green = '133, 153, 0';

        function rgb (str) {
          return 'rgb(' + str + ')';
        }

        function rgba (str, a) {
          return 'rgba(' + str + ',' + a + ')';
        }

        function lastFromArr (arr, num) {
          if (!angular.isArray(arr)) { return; }
          if (!angular.isNumber(num)) { return; }
          return arr.slice(arr.length - num, arr.length);
        }

        $scope.buildData = function (amount) {
          if (!angular.isNumber(amount) && amount <= 30) { return; }
          return {
            labels: lastFromArr(blank, amount),
            datasets: [
              {
                fillColor: rgba(green, '.3'),
                strokeColor: rgb(green),
                data: lastFromArr(good, amount)
              },
              {
                fillColor: rgba(red, '.3'),
                strokeColor: rgb(red),
                data: lastFromArr(bad, amount)
              }
            ]
          };
        };

      }],
      link: function postLink(scope, element, attrs) {

        var ctx = element[0].getContext('2d');

        var barConfig = {
          scaleShowGridLines: false,
          scaleShowLabels: false,
          barStrokeWidth: 1,
          barValueSpacing: 5
        };

        scope.$watch('chartShowing', function (p) {
          p = p || parseInt(attrs.period, 10);
          new window.Chart(ctx).Bar(scope.buildData(p), barConfig);
        }, true);

      }
    };
  });
