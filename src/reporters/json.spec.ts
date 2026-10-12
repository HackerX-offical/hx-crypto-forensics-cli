import { buildForensicsReport, serializeForensicsReport } from './json';

describe('forensics JSON reporter', () => {
  test('buildForensicsReport stamps ISO time', () => {
    const report = buildForensicsReport();
    expect(report.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  test('serializeForensicsReport returns pretty JSON', () => {
    const json = serializeForensicsReport(
      buildForensicsReport({
        analysis: {
          algorithm: 'SHA-256 (Raw)',
          riskScore: 9,
          warnings: [],
          recommendations: [],
          properties: {},
        },
      }),
    );
    const parsed = JSON.parse(json);
    expect(parsed.analysis.algorithm).toContain('SHA-256');
  });
});
