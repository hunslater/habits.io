'use strict';

describe('Filter: className', function () {

  // load the filter's module
  beforeEach(module('habitsApp'));

  // initialize a new instance of the filter before each test
  var className;
  beforeEach(inject(function ($filter) {
    className = $filter('className');
  }));

  it('should return the input prefixed with "className filter:"', function () {
    var text = 'angularjs';
    expect(className(text)).toBe('className filter: ' + text);
  });

});
