'use strict';

describe('Controller: DashboardCtrl', function () {

  var mockUser = {};
  var DashboardCtrl,
      scope,
      user;

  // load the controller's module
  beforeEach(module('s4nLifeApp', function ($provide) {
    $provide.value('user', mockUser);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, _user_) {
    mockUser.data = [
      {name: 'fulano'},
      {name: 'sutano'},
      {name: 'mengano'}
    ];

    mockUser.getAll = function (){
      var defer = $q.defer();
      defer.resolve(this.data);
      return defer.promise;
    };

    scope = $rootScope.$new();
    user = _user_;
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      user: user
    });
    scope.$digest();
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
    scope.selectedUser = mockUser.data[0];
    expect(scope.selectedUser.name).toBe(mockUser.data[0].name);
  });
});
