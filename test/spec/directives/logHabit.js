'use strict';

describe('Directive: logHabit', function () {
  beforeEach(module('habitsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<log-habit></log-habit>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the logHabit directive');
  }));
});
