import { HashEngine } from './HashEngine';

describe('HashEngine', () => {
  test('sha256 is deterministic', async () => {
    const a = await HashEngine.hash('secret', { algorithm: 'sha256' });
    const b = await HashEngine.hash('secret', { algorithm: 'sha256' });
    expect(a.hash).toBe(b.hash);
    expect(a.hash).toHaveLength(64);
  });

  test('rejects empty input', async () => {
    await expect(HashEngine.hash('', { algorithm: 'sha256' })).rejects.toThrow(/empty/i);
  });
});
