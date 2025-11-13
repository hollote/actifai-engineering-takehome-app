'use strict';

function parseIds(idsString) {
  if (idsString === undefined || idsString === null || idsString.trim() === '') {
    return null;
  }

  const ids = idsString.split(',').map(id => {
    const trimmed = id.trim();
    if (!/^\d+$/.test(trimmed)) {
      throw new Error(`Invalid ID: ${trimmed}`);
    }
    const parsed = parseInt(trimmed, 10);
    if (parsed <= 0) {
      throw new Error(`Invalid ID: ${trimmed}`);
    }
    return parsed;
  });

  return (ids.length > 0 ? ids : null);
}

module.exports = parseIds;
