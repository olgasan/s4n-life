'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('s4nLifeApp'));

  var DashboardCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/users')
      .respond([
        {name : 'fulano'},
        {name : 'sutano'},
        {name : 'mengano'}
      ]);

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

  it("returns the selected user", function () {
    expect(scope.getSelectedUser).toBeDefined();
    expect(scope.getSelectedUser()).toBeDefined();
  });
});
