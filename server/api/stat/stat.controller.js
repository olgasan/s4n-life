'use strict';

var _ = require('lodash');

// Get list of stats
exports.index = function(req, res) {
  res.json([
    {
      project: 'p1',
      data: [
        {
          reviewed: 'fulanito',
          reviewer: 'sutanito',
          stats: [2, 4, 4]
        }
      ]
    },
    {
      project: 'p4',
      data: [
        {
          reviewed: 'fulanito',
          reviewer: 'sutanito',
          stats: [3, 2, 5]
        },
        {
          reviewed: 'fulanito',
          reviewer: 'menganito',
          stats: [4, 3, 4]
        }
      ]
    }
  ]);
};
