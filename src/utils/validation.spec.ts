import { ValidationUtils } from './validation';

describe('ValidationUtils', () => {
  it('rejects empty input', () => {
    expect(() => ValidationUtils.validateInputString('')).toThrow(/empty/i);
  });

  it('accepts valid algorithm names', () => {
    expect(ValidationUtils.validateAlgorithm('sha256')).toBe(true);
    expect(ValidationUtils.validateAlgorithm('bcrypt')).toBe(true);
  });

  it('rejects unknown algorithms', () => {
    expect(() => ValidationUtils.validateAlgorithm('md5')).toThrow(/Invalid algorithm/i);
  });

  it('validates bcrypt rounds range', () => {
    expect(() => ValidationUtils.validateRounds(3)).toThrow();
    expect(() => ValidationUtils.validateRounds(32)).toThrow();
    expect(() => ValidationUtils.validateRounds(10)).not.toThrow();
  });
});
