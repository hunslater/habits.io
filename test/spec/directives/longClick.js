'use strict';

describe('Directive: longClick', function () {
  beforeEach(module('habitsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<long-click></long-click>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the longClick directive');
  }));
});
