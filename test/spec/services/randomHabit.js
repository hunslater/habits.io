'use strict';

describe('Service: randomHabit', function () {

  // load the service's module
  beforeEach(module('habitsApp'));

  // instantiate service
  var randomHabit;
  beforeEach(inject(function (_randomHabit_) {
    randomHabit = _randomHabit_;
  }));

  it('should be a function', function () {
    expect(angular.isFunction(randomHabit)).toBe(true);
  });

  it('should return an array of 2 strings', function () {
    var habit = randomHabit();
    expect(habit.length).toBe(2);
    expect(angular.isArray(habit)).toBe(true);
    expect(angular.isString(habit[0])).toBe(true);
    expect(angular.isString(habit[1])).toBe(true);
  });

});
