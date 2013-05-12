'use strict';

describe('Directive: chart', function () {
  beforeEach(module('habitsApp'));

  var element;

  beforeEach(inject(function inject($rootScope) {
    $rootScope.habits = [];
  }));

  it('should make a working canvas element', inject(function ($rootScope, $compile) {
    element = angular.element('<chart></chart>');
    element = $compile(element)($rootScope);
    var ctx = element[0].getContext('2d');
    expect(element[0].nodeName).toBe('CANVAS');
    expect(angular.isFunction(element[0].getContext)).toBe(true);
    expect(angular.isObject(ctx)).toBe(true);
    expect(ctx.canvas).toBe(element[0]);
  }));

});
