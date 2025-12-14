export type HashAlgorithm = "sha256" | "bcrypt" | "argon2";

export interface HashOptions {
  algorithm: HashAlgorithm;
  saltRounds?: number; // for bcrypt
  memoryCost?: number; // for argon2
  parallelism?: number; // for argon2
  timeCost?: number; // for argon2
}

export interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
  salt: string; // Extracted or used salt
  params: HashOptions;
  executionTimeMs: number;
}

export interface AnalysisResult {
  algorithm: string; // Identified algorithm
  riskScore: number; // 0-10 (10 is high risk)
  warnings: string[];
  recommendations: string[];
  properties: {
    rounds?: number;
    saltLength?: number;
    memory?: number;
    parallelism?: number;
    truncated?: boolean;
  };
}

export interface Explanation {
  title: string;
  content: string;
  technicalDetails: string;
  example?: string;
}
