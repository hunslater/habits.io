'use strict';

angular.module('habitsApp')
  .directive('logHabit', function () {
    return {
      templateUrl: 'views/logHabit.html',
      restrict: 'E',
      controller: ['$scope', '$attrs', 'habits', function ($scope, $attrs, habits) {

        $scope.logsInvisible = true;
        $scope.habit = $attrs.habit;

        $scope.add = function (date) {
          habits.addLog($scope.$index, date);
          $scope.update();
        };

        $scope.update = function (date, amount) {
          habits.updateLog($scope.$index, date, amount);
        };

        $scope.updateBox = function (day) {
          day.show = true;
        }

      }],
      link: function postLink(scope, element, attrs) {

        scope.days = {};
        var today = new Date();

        function pad (num) {
          var str = '' + num;
          return str.length > 1 ? str: '0' + str;
        }

        function dateKey (date) {
          if (!angular.isDate(date)) { return; }
          return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
        }

        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        function fmtDate (date) {
          if (!angular.isDate(date)) { return; }
          return date.getDate() + ' ' + monthNames[date.getMonth()].substr(0, 3);
        }

        function makeDay (date) {
          // normalize time
          date.setHours(1);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          return {
            date: date,
            key: dateKey(date),
            pretty: fmtDate(date),
            log: 0
          };
        }

        function generateDays (today, populate) {
          if (!angular.isDate(today)) { return; }
          for (var i = -7; i < 8; i++) {
            var date = new Date();
            date.setDate(today.getDate() + i);
            var key = dateKey(date);
            populate[key] = makeDay(date);
          }
        }

        function updateLogs (days, checkAgainst) {
          for (var key in days) {
            var day = days[key];
            var date = day.date;
            var logs = checkAgainst[date.valueOf()];
            if (logs !== undefined) {
              days[key].log = logs;
            }
          }
        }

        scope.update = function () {
          updateLogs(scope.days, scope.habit.logs);
        };

        scope.showLogs = function () {
          scope.logsInvisible = !scope.logsInvisible;
          if (!scope.logsInvisible) { generateDays(today, scope.days); }
          scope.update();
        };

      }
    };
  });
