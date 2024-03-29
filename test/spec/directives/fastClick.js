'use strict';

describe('Directive: fastClick', function () {
  beforeEach(module('habitsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<fast-click></fast-click>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the fastClick directive');
  }));
});
