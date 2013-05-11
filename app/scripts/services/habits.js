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

      checkId: checkId

    };

  }]);
