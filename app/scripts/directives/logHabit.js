'use strict';

angular.module('habitsApp')
  .directive('logHabit', function () {
    return {
      templateUrl: 'views/logHabit.html',
      restrict: 'E',
      controller: ['$scope', '$attrs', function (scope, attrs) {

        scope.logsInvisible = true;
        scope.habit = attrs.habit;

        scope.add = function (date) {
          scope.$root.habit.log.add(scope.$index, date);
          //scope.logsInvisible = true;
        };

        scope.update = function (date, amount) {
          scope.$root.habit.log.update(scope.$index, date, amount);
          //scope.logsInvisible = true;
        };

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

        function generateDays (today, populate, checkAgainst) {
          if (!angular.isDate(today)) { return; }
          console.log(checkAgainst)
          for (var i = -7; i < 8; i++) {
            var date = new Date();
            date.setDate(today.getDate() + i);
            var key = dateKey(date);
            populate[key] = makeDay(date);
            var logs = checkAgainst[date.valueOf()];
            if (logs !== undefined) {
              console.log(populate[key])
              populate[key].log = logs;
            }
          }
        }

        scope.showLogs = function () {
          scope.logsInvisible = !scope.logsInvisible;
          generateDays(today, scope.days, scope.habit.logs);
        };


      }
    };
  });
