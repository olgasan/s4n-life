'use strict';

describe('Service: user', function () {

  // load the service's module
  beforeEach(module('s4nLifeApp'));

  // instantiate service
  var user, $httpBackend, response;

  beforeEach(inject(function (_user_, _$httpBackend_) {
    user = _user_;
    $httpBackend = _$httpBackend_;

    response = [
        {name: 'fulano'},
        {name: 'sutano'},
        {name: 'mengano'}
    ];

    $httpBackend.expectGET('/api/users').respond(response);
  }));

  it('should return all stored users', function () {
    expect(user.getAll).toBeDefined();

    var all = undefined;
    user.getAll().then(function (users) {
      all = users;
    });

    $httpBackend.flush();
    expect(angular.isArray(all)).toBeTruthy();
    expect(all.length).toBe(3);
  });

});
