'use strict';

describe('Filter: className', function () {

  // load the filter's module
  beforeEach(module('habitsApp', ['LocalStorageModule']));

  //var store;
  //beforeEach(inject(function (localStorageService) {
    //store = $service(localStorageService);
  //}));

  // initialize a new instance of the filter before each test
  var className;
  beforeEach(inject(function ($filter) {
    className = $filter('className');
  }));

  it('should return the className when the input is true', function () {
    var bool = true;
    expect(className(bool, 'className')).toBe('className');
  });

  it('should return an empty string when the input is true', function () {
    var bool = false;
    expect(className(bool, 'className')).toBe('');
  });
});
