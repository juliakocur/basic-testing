import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = { a: 5, b: 2, action: Action.Add };
    const expected = 7;
    expect(simpleCalculator(result)).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const result = { a: 5, b: 2, action: Action.Subtract };
    const expected = 3;
    expect(simpleCalculator(result)).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const result = { a: 5, b: 2, action: Action.Multiply };
    const expected = 10;
    expect(simpleCalculator(result)).toBe(expected);
  });

  test('should divide two numbers', () => {
    const result = { a: 10, b: 2, action: Action.Divide };
    const expected = 5;
    expect(simpleCalculator(result)).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    const result = { a: 10, b: 2, action: Action.Exponentiate };
    const expected = 100;
    expect(simpleCalculator(result)).toBe(expected);
  });

  test('should return null for invalid action', () => {
    const result = { a: 10, b: 2, action: 'Invalid' };
    const expected = null;
    expect(simpleCalculator(result)).toBe(expected);
  });

  test('should return null for invalid arguments', () => {
    const result = { a: '10', b: 'b', action: Action.Add };
    const expected = null;
    expect(simpleCalculator(result)).toBe(expected);
  });
});
