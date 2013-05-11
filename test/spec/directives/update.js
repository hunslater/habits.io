'use strict';

describe('Directive: update', function () {
  beforeEach(module('habitsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<update></update>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the update directive');
  }));
});
