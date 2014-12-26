'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('s4nLifeApp'));

  var DashboardCtrl,
      scope,
      $httpBackend,
      response;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    response = [
      {name : 'fulano'},
      {name : 'sutano'},
      {name : 'mengano'}
    ];

    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/users')
      .respond(response);

    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });

    $httpBackend.flush();
  }));

  it('scope should have users', function () {
    expect(scope.users).toBeDefined();
    expect(angular.isArray(scope.users)).toBeTruthy();
  });

  it('should attach a list of users to the scope', function () {
    expect(scope.users.length).toBe(3);
  });

  it("null user is selected by default", function () {
    expect(scope.selectedUser).not.toBeDefined();
    scope.selectedUser = response[0];
    expect(scope.selectedUser.name).toBe(response[0].name);
  });
});
