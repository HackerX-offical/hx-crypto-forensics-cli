import { AnalysisEngine } from './AnalysisEngine';

describe('AnalysisEngine', () => {
  test('detects raw SHA-256 hex', () => {
    const sample = 'a'.repeat(64);
    const result = AnalysisEngine.analyze(sample);
    expect(result.algorithm).toContain('SHA-256');
    expect(result.riskScore).toBeGreaterThan(5);
  });

  test('detects bcrypt with rounds', () => {
    const bcrypt = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
    const result = AnalysisEngine.analyze(bcrypt);
    expect(result.algorithm).toBe('Bcrypt');
    expect(result.properties.rounds).toBe(10);
  });
});
