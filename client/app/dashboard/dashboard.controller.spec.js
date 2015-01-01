'use strict';

describe('Controller: DashboardCtrl', function () {

  var mockUser = {};
  var mockProject = {};
  var DashboardCtrl,
      scope,
      user,
      project;

  // load the controller's module
  beforeEach(module('s4nLifeApp', function ($provide) {
    $provide.value('user', mockUser);
    $provide.value('project', mockProject);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, _user_, _project_) {
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

    mockProject.data = [
      {
        name: 'p1',
        developers: ['sutanito', 'merengano']
      }
    ];

    mockProject.getByUser = function (name){
      var defer = $q.defer();
      defer.resolve(this.data);
      return defer.promise;
    };

    scope = $rootScope.$new();
    user = _user_;
    project = _project_;
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      user: user,
      project: project
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
    scope.selectedUser = mockUser.data[0];
    expect(scope.selectedUser.name).toBe(mockUser.data[0].name);
  });

  it("obtains project data when user is selected", function () {
    scope.selectedUser = mockUser.data[0];
    scope.update ();
    scope.$digest();
    expect(scope.selectedUser.projects).toBeDefined();
    expect(scope.selectedUser.projects).toBe(mockProject.data);
  });
});
