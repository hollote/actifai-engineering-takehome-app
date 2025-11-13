'use strict';

const isValidSortField = require('./isValidSortField');

describe('isValidSortField', () => {
  const validFields = ['period', 'total_revenue', 'sales_count', 'average_revenue'];

  describe('valid sort fields', () => {
    test('should return true for "period"', () => {
      expect(isValidSortField('period', validFields)).toBe(true);
    });

    test('should return true for "total_revenue"', () => {
      expect(isValidSortField('total_revenue', validFields)).toBe(true);
    });

    test('should return true for "sales_count"', () => {
      expect(isValidSortField('sales_count', validFields)).toBe(true);
    });

    test('should return true for "average_revenue"', () => {
      expect(isValidSortField('average_revenue', validFields)).toBe(true);
    });
  });

  describe('invalid sort fields', () => {
    test('should return false for field not in list', () => {
      expect(isValidSortField('invalid_field', validFields)).toBe(false);
    });

    test('should return false for empty string', () => {
      expect(isValidSortField('', validFields)).toBe(false);
    });

    test('should return false for case mismatch', () => {
      expect(isValidSortField('PERIOD', validFields)).toBe(false);
    });

    test('should return false for partial match', () => {
      expect(isValidSortField('period_', validFields)).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('should return false for null', () => {
      expect(isValidSortField(null, validFields)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(isValidSortField(undefined, validFields)).toBe(false);
    });

    test('should return false for number', () => {
      expect(isValidSortField(123, validFields)).toBe(false);
    });

    test('should return false for object', () => {
      expect(isValidSortField({}, validFields)).toBe(false);
    });

    test('should handle empty valid fields array', () => {
      expect(isValidSortField('period', [])).toBe(false);
    });
  });
});
