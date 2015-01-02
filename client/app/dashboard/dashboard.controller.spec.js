'use strict';

describe('Controller: DashboardCtrl', function () {

  var mockUser = {};
  var mockProject = {};
  var mockStats = {};
  var DashboardCtrl,
    scope,
    user,
    project,
    stats;

  // load the controller's module
  beforeEach(module('s4nLifeApp', function ($provide) {
    $provide.value('user', mockUser);
    $provide.value('project', mockProject);
    $provide.value('stats', mockStats);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, _user_, _project_, _stats_) {
    mockUser.data = [
      {name: 'fulano'},
      {name: 'sutano'},
      {name: 'mengano'}
    ];

    mockUser.getAll = function () {
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

    mockProject.getByUser = function (name) {
      var defer = $q.defer();
      defer.resolve(this.data);
      return defer.promise;
    };

    mockStats.data = [
      {
        project: 'p1',
        data: [
          {
            reviewed: 'fulanito',
            reviewer: 'sutanito',
            stats: [2, 4, 4]
          }
        ]
      }
    ];

    mockStats.getByProject = function (name) {
      var defer = $q.defer();
      defer.resolve(this.data);
      return defer.promise;
    };

    scope = $rootScope.$new();
    user = _user_;
    project = _project_;
    stats = _stats_;
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      user: user,
      project: project
    });
    scope.$digest();
  }));

  it("scope should have users", function () {
    expect(scope.users).toBeDefined();
    expect(angular.isArray(scope.users)).toBeTruthy();
  });

  it("should attach a list of users to the scope", function () {
    expect(scope.users.length).toBe(3);
  });

  it("null user is selected by default", function () {
    scope.selectedUser = mockUser.data[0];
    expect(scope.selectedUser.name).toBe(mockUser.data[0].name);
  });

  it("obtains project data when user is selected", function () {
    scope.selectedUser = mockUser.data[0];
    scope.updateUser();
    scope.$digest();
    expect(scope.selectedUser.projects).toBeDefined();
    expect(scope.selectedUser.projects).toBe(mockProject.data);
  });

  it("obtains user stats for selected project", function () {
    expect(scope.selectedProject).toBeDefined();
    scope.updateStats();
    scope.$digest();
    expect(scope.selectedProject.stats).toBeDefined();
  });

  it("initialize options for chart", function () {
    var config = scope.chart.config;
    expect(config).toBeDefined ();
    expect(config.responsive).toBeDefined ();
    expect(config.scaleShowLine).toBeDefined ();
    expect(config.angleShowLineOut).toBeDefined ();
    expect(config.scaleShowLabels).toBeDefined ();
    expect(config.scaleBeginAtZero).toBeDefined ();
    expect(config.angleLineColor).toBeDefined ();
    expect(config.angleLineWidth).toBeDefined ();
    expect(config.pointLabelFontFamily).toBeDefined ();
    expect(config.pointLabelFontStyle).toBeDefined ();
    expect(config.pointLabelFontSize).toBeDefined ();
    expect(config.pointLabelFontColor).toBeDefined ();
    expect(config.pointDot).toBeDefined ();
    expect(config.pointDotRadius).toBeDefined ();
    expect(config.pointDotStrokeWidth).toBeDefined ();
    expect(config.pointHitDetectionRadius).toBeDefined ();
    expect(config.datasetStroke).toBeDefined ();
    expect(config.datasetStrokeWidth).toBeDefined ();
    expect(config.datasetFill).toBeDefined ();
    expect(config.legendTemplate).toBeDefined ();
  });
});
