'use strict';

const isValidRole = require('./isValidRole');

describe('isValidRole', () => {
  describe('valid roles', () => {
    test('should return true for valid role string', () => {
      expect(isValidRole('Admin')).toBe(true);
    });

    test('should return true for Call Center Agent', () => {
      expect(isValidRole('Call Center Agent')).toBe(true);
    });

    test('should return true for role with spaces', () => {
      expect(isValidRole('Retail Agent')).toBe(true);
    });
  });

  describe('invalid roles', () => {
    test('should return false for empty string', () => {
      expect(isValidRole('')).toBe(false);
    });

    test('should return false for whitespace only', () => {
      expect(isValidRole('   ')).toBe(false);
    });

    test('should return false for tabs and spaces', () => {
      expect(isValidRole('\t\n')).toBe(false);
    });
  });

  describe('edge cases - non-string types', () => {
    test('should return false for number', () => {
      expect(isValidRole(123)).toBe(false);
    });

    test('should return false for object', () => {
      expect(isValidRole({})).toBe(false);
    });

    test('should return false for array', () => {
      expect(isValidRole([])).toBe(false);
    });

    test('should return false for null', () => {
      expect(isValidRole(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(isValidRole(undefined)).toBe(false);
    });
  });
});
