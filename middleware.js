'use strict';

const isValidDate = require('./lib/isValidDate');
const isValidRole = require('./lib/isValidRole');
const isValidSortField = require('./lib/isValidSortField');

// Middleware to validate query parameters for sales endpoints
function validateSalesParams(validSortFields) {
  return (req, res, next) => {
    const { start_date, end_date, role, sort_by, interval } = req.query;

    if (start_date && !isValidDate(start_date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid start_date format. Expected YYYY-MM-DD'
      });
    }

    if (end_date && !isValidDate(end_date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid end_date format. Expected YYYY-MM-DD'
      });
    }

    if (role && !isValidRole(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role parameter'
      });
    }

    if (sort_by && !isValidSortField(sort_by, validSortFields)) {
      return res.status(400).json({
        success: false,
        error: `Invalid sort_by parameter. Valid options: ${validSortFields.join(', ')}`
      });
    }

    if (interval && !['day', 'week', 'month'].includes(interval)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid interval parameter. Valid options: day, week, month'
      });
    }

    next();
  };
}

module.exports = {
  validateSalesParams
};
