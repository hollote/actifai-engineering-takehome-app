'use strict';

function isValidSortField(sortBy, validFields) {
  return validFields.includes(sortBy);
}

module.exports = isValidSortField;
