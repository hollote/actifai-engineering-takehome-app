'use strict';

function isValidRole(role) {
  return (typeof role === 'string' && role.trim().length > 0);
}

module.exports = isValidRole;
