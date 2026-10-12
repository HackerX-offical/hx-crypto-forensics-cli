import { SaltEngine } from './SaltEngine';

describe('SaltEngine', () => {
  test('generateSalt returns hex of expected length', () => {
    const salt = SaltEngine.generateSalt(8);
    expect(salt).toMatch(/^[a-f0-9]{16}$/);
  });

  test('simulateSaltReuseExample warns on identical inputs', () => {
    const { hash1, hash2, analysis } = SaltEngine.simulateSaltReuseExample(
      'pw',
      'pw',
      'fixed-salt',
    );
    expect(hash1).toBe(hash2);
    expect(analysis).toMatch(/WARNING/i);
  });
});
