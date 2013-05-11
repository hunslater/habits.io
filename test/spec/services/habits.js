'use strict';

describe('Service: habits', function () {

  // load the service's module
  beforeEach(module('habitsApp'));

  // instantiate service
  var habits;
  beforeEach(inject(function (_habits_) {
    habits = _habits_;
  }));

  it('should do something', function () {
    expect(!!habits).toBe(true);
  });

});
