import { AnalysisResult, HashResult } from '../core/types';

export interface ForensicsReport {
  generatedAt: string;
  hashResult?: HashResult;
  analysis?: AnalysisResult;
}

export function buildForensicsReport(
  partial: Omit<ForensicsReport, 'generatedAt'> = {},
): ForensicsReport {
  return {
    generatedAt: new Date().toISOString(),
    ...partial,
  };
}

export function serializeForensicsReport(report: ForensicsReport): string {
  return JSON.stringify(report, null, 2);
}
