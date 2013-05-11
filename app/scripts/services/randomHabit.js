'use strict';

angular.module('habitsApp')
  .factory('randomHabit', function () {

    var habits = {

      good: [
        'Exercise',
        'Read',
        'Write',
        'Practice instrument',
        'Eat fruit or veg',
        'Cook'
      ],

      bad: [
        'Smoke',
        'Eat chocolate',
        'Junk food'
      ]

    };

    function rand(array) {
      if (!angular.isArray(array)) { return; }
      return array[Math.floor(Math.random() * array.length)];
    }

    return function () {
      var goodOrBad = Math.round(Math.random()) ? 'good': 'bad';
      return [goodOrBad, rand(habits[goodOrBad])];
    };

  });
