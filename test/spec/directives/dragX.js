'use strict';

describe('Directive: dragX', function () {
  beforeEach(module('habitsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<drag-x></drag-x>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the dragX directive');
  }));
});
