'use strict';

var _ = require('lodash');

// Get list of projects
exports.index = function(req, res) {
  res.json([
    {
      name: 'p1',
      developers: ['fulanito', 'sutanito']
    },
    {
      name: 'p2',
      developers: ['fulanito']
    },
    {
      name: 'p3',
      developers: ['menganito', 'sutanito']
    },
    {
      name: 'p4',
      developers: ['fulanito', 'menganito', 'sutanito']
    }
  ]);
};
