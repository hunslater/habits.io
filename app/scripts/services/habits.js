'use strict';

angular.module('habitsApp')
  .factory('habits', ['storage', '$rootScope', function (storage, $rootScope) {

    function save () {
      storage.add('habits', $rootScope.habits);
    }

    function checkId (id) {
      return !angular.isNumber(id) || (id < 0) || (id > $rootScope.habits.length - 1);
    }

    var goodBadRe = /^good$|^bad$/;

    function checkSentiment (str) {
      return !goodBadRe.test(str);
    }

    return {

      exists: function () {
        $rootScope.habits = storage.get('habits');
        return !!$rootScope.habits;
      },

      init: function () {
        $rootScope.habits = [];
      },

      hasHabits: function () {
        return angular.isArray($rootScope.habit) && $rootScope.habit.length > 0;
      },

      addHabit: function (name, sentiment) {
        if(checkSentiment(sentiment)) { return; }
        $rootScope.habits.push({
          name: name,
          sentiment: sentiment,
          logs: {}
        });
        save();
      },

      delHabit: function (id) {
        if (checkId(id)) { return; }
        $rootScope.habits.splice(id, 1);
        save();
      },

      editHabit: function (id, name, sentiment) {
        if (checkSentiment(sentiment)) { return; }
        if (checkId(id)) { return; }
        $rootScope.habits[id].name = name;
        $rootScope.habits[id].sentiment = sentiment;
        save();
      },

      getHabit: function (id) {
        if (checkId(id)) { return; }
        return $rootScope.habits[id];
      },

      addLog: function (id, date) {
        if (checkId(id)) { return; }
        if (!angular.isDate(date)) { return; }
        var key = date.valueOf();
        var current = $rootScope.habits[id].logs[key];
        $rootScope.habits[id].logs[key] = angular.isNumber(current) ? current + 1: 1;
        save();
      },

      updateLog: function (id, date, amount) {
        if (checkId(id)) { return; }
        if (!angular.isDate(date)) { return; }
        if (!angular.isNumber(amount) || (amount < 0)) { return; }
        var key = date.valueOf() + '';
        $rootScope.habits[id].logs[key] = amount;
        save();
      },

      checkId: checkId,

      clearData: function () {
        storage.clear();
      },

      export: function () {

        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        function fmtDate (date) {
          if (!angular.isDate(date)) { return; }
          return date.getDate() + ' ' + monthNames[date.getMonth()].substr(0, 3);
        }

        function normalise (date) {
          if (!angular.isDate(date)) { return; }
          date.setHours(1);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
        }

        var good = [];
        var bad = [];
        var labels = [];

        var today = new Date();
        normalise(today);

        for (var i = 90; i >= 0; i--) {

          var newDate = new Date;
          newDate.setDate(today.getDate() - i);
          normalise(newDate);
          var dateStr = newDate.valueOf();

          var goodCount = 0;
          var badCount = 0;
          var labelStr = fmtDate(newDate);

          $rootScope.habits.forEach(function (el, i) {
            var count = parseInt(el.logs[dateStr], 10);
            if (isNaN(count)) { return; }
            if (el.sentiment === 'good') {
              goodCount += count;
            }
            if (el.sentiment == 'bad') {
              badCount += count;
            }
          });

          good.push(goodCount);
          bad.push(badCount);
          labels.push(labelStr);

        }


        return {
          labels: labels,
          good: good,
          bad: bad
        }

      }

    };

  }]);
