import { previewHash } from './hash-preview';

describe('previewHash', () => {
  test('returns short hashes unchanged', () => {
    expect(previewHash('abc')).toBe('abc');
  });

  test('truncates long hashes with ellipsis', () => {
    const long = 'a'.repeat(80);
    const out = previewHash(long, 4);
    expect(out).toBe('aaaa…aaaa');
    expect(out.length).toBeLessThan(long.length);
  });
});
