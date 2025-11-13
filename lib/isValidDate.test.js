'use strict';

const isValidDate = require('./isValidDate');

describe('isValidDate', () => {
  describe('valid dates', () => {
    test('should return true for valid date format YYYY-MM-DD', () => {
      expect(isValidDate('2021-01-01')).toBe(true);
    });

    test('should return true for another valid date', () => {
      expect(isValidDate('2023-12-31')).toBe(true);
    });

    test('should return true for leap year date', () => {
      expect(isValidDate('2020-02-29')).toBe(true);
    });
  });

  describe('invalid date formats', () => {
    test('should return false for DD-MM-YYYY format', () => {
      expect(isValidDate('01-01-2021')).toBe(false);
    });

    test('should return false for slash-separated date', () => {
      expect(isValidDate('2021/01/01')).toBe(false);
    });

    test('should return false for single-digit month', () => {
      expect(isValidDate('2021-1-01')).toBe(false);
    });

    test('should return false for single-digit day', () => {
      expect(isValidDate('2021-01-1')).toBe(false);
    });
  });

  describe('invalid dates', () => {
    test('should return false for invalid month', () => {
      expect(isValidDate('2021-13-01')).toBe(false);
    });

    test('should return false for invalid day', () => {
      expect(isValidDate('2021-02-30')).toBe(false);
    });

    test('should return false for non-leap year Feb 29', () => {
      expect(isValidDate('2021-02-29')).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('should return false for empty string', () => {
      expect(isValidDate('')).toBe(false);
    });

    test('should return false for random text', () => {
      expect(isValidDate('abc')).toBe(false);
    });

    test('should return false for number string', () => {
      expect(isValidDate('123')).toBe(false);
    });
  });
});
