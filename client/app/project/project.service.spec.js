'use strict';

describe('Service: project', function () {

  // load the service's module
  beforeEach(module('s4nLifeApp'));

  // instantiate service
  var project, $httpBackend, response;

  beforeEach(inject(function (_project_, _$httpBackend_) {
    project = _project_;
    $httpBackend = _$httpBackend_;

    response = [
      {
        name: 'p1',
        developers: ['sutanito', 'merengano']
      },
      {
        name: 'p4',
        developers: ['sutanito']
      }
    ];

    $httpBackend.expectGET('/api/projects').respond(response);
  }));

  it('should return projects for given user', function () {
    expect(project.getByUser).toBeDefined();

    var userProject = undefined;
    project.getByUser('merengano').then(function (pData) {
      userProject = pData;
    });

    $httpBackend.flush();
    expect(angular.isArray(userProject)).toBeTruthy();
    expect(userProject.length).toBe(1);
  });

});
