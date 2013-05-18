'use strict';

angular.module('habitsApp')
  .directive('logHabit', function () {
    return {
      templateUrl: 'views/logHabit.html',
      restrict: 'A',
      controller: ['$scope', '$rootScope', '$attrs', 'habits', function ($scope, $rootScope, $attrs, habits) {

        $scope.logsInvisible = true;
        $scope.habit = $attrs.habit;
        $scope.id = $scope.$index;

        $scope.addLog = function (day) {
          habits.addLog($scope.$index, day.date);
          $scope.update();
        };

        var slice = Array.prototype.slice;

        $scope.showUpdate = function () {
          var args = slice.call(arguments);
          args.push(function () {
            $scope.update();
          });
          $rootScope.updateHabit.apply(null, args);
        };

      }],
      link: function postLink(scope) {

        var generated = false;
        scope.days = {};
        var today = new Date();
        // normalise time
        today.setHours(1);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);


        function pad (num) {
          var str = '' + num;
          return str.length > 1 ? str: '0' + str;
        }

        function dateKey (date) {
          if (!angular.isDate(date)) { return; }
          return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
        }

        var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        function fmtDate (date) {
          if (!angular.isDate(date)) { return; }
          return date.getDate() + ' ' + monthNames[date.getMonth()].substr(0, 3);
        }

        function fmtDay (date) {
          if (!angular.isDate(date)) { return; }
          return dayNames[date.getDay()].substr(0, 3);
        }

        function makeDay (date) {
          // normalise time
          date.setHours(1);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          return {
            date: date,
            key: dateKey(date),
            prettyDay: fmtDay(date),
            prettyDate: fmtDate(date),
            log: 0,
            today: today.valueOf() === date.valueOf()
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
          if (!generated) {
            generateDays(today, scope.days);
            generated = true;
          }
          scope.update();
        };

      }
    };
  });
