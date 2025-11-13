'use strict';

const parseIds = require('./parseIds');

describe('parseIds', () => {
  describe('valid ID strings', () => {
    test('should parse single ID', () => {
      expect(parseIds('1')).toEqual([1]);
    });

    test('should parse multiple IDs', () => {
      expect(parseIds('1,2,3')).toEqual([1, 2, 3]);
    });

    test('should parse IDs with spaces', () => {
      expect(parseIds('1, 2, 3')).toEqual([1, 2, 3]);
    });

    test('should parse IDs with extra spaces', () => {
      expect(parseIds('  1  ,  2  ,  3  ')).toEqual([1, 2, 3]);
    });

    test('should parse large numbers', () => {
      expect(parseIds('100,200,300')).toEqual([100, 200, 300]);
    });
  });

  describe('invalid ID strings', () => {
    test('should throw error for non-numeric ID', () => {
      expect(() => parseIds('abc')).toThrow('Invalid ID: abc');
    });

    test('should throw error for negative number', () => {
      expect(() => parseIds('-1')).toThrow('Invalid ID: -1');
    });

    test('should throw error for zero', () => {
      expect(() => parseIds('0')).toThrow('Invalid ID: 0');
    });

    test('should throw error for decimal number', () => {
      expect(() => parseIds('1.5')).toThrow('Invalid ID: 1.5');
    });

    test('should throw error for mixed valid and invalid IDs', () => {
      expect(() => parseIds('1,abc,3')).toThrow('Invalid ID: abc');
    });

    test('should throw error for empty string between commas', () => {
      expect(() => parseIds('1,,3')).toThrow('Invalid ID:');
    });
  });

  describe('edge cases', () => {
    test('should throw error for empty string', () => {
      expect(() => parseIds('')).toThrow();
    });

    test('should throw error for only commas', () => {
      expect(() => parseIds(',,')).toThrow();
    });

    test('should throw error for whitespace only', () => {
      expect(() => parseIds('   ')).toThrow();
    });
  });
});
