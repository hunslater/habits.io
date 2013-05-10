'use strict';

describe('Service: randomHabit', function () {

  // load the service's module
  beforeEach(module('habitsApp'));

  // instantiate service
  var placeholder;
  beforeEach(inject(function (_placeholder_) {
    placeholder = _placeholder_;
  }));

  it('should do something', function () {
    expect(!!placeholder).toBe(true);
  });

});
