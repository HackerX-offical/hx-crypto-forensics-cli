import { AnalysisResult } from "../core/types";

export class AnalysisEngine {
  static analyze(hash: string): AnalysisResult {
    const result: AnalysisResult = {
      algorithm: "Unknown",
      riskScore: 0,
      warnings: [],
      recommendations: [],
      properties: {},
    };

    // SHA-256 (Hex string, 64 chars)
    if (/^[a-f0-9]{64}$/i.test(hash)) {
      result.algorithm = "SHA-256 (Raw)";
      result.riskScore = 9;
      result.warnings.push("Fast deterministic hash detected.");
      result.warnings.push("No salt detected (raw hex output).");
      result.recommendations.push("Do NOT use raw SHA-256 for passwords.");
      result.recommendations.push("Switch to Bcrypt or Argon2.");
      result.properties.truncated = false;
    }
    // Bcrypt ($2a$, $2b$, $2y$)
    else if (
      hash.startsWith("$2a$") ||
      hash.startsWith("$2b$") ||
      hash.startsWith("$2y$")
    ) {
      result.algorithm = "Bcrypt";
      const parts = hash.split("$");
      const rounds = parseInt(parts[2], 10);
      result.properties.rounds = rounds;

      if (rounds < 10) {
        result.riskScore = 5;
        result.warnings.push(
          `Low cost factor detected: ${rounds}. Standard is 10-12.`
        );
        result.recommendations.push("Increase work factor to at least 10.");
      } else {
        result.riskScore = 1;
        result.recommendations.push("Configuration looks secure.");
      }
    }
    // Argon2 ($argon2)
    else if (hash.startsWith("$argon2")) {
      result.algorithm = "Argon2";
      result.riskScore = 0; // Modern standard
      result.recommendations.push(
        "Excellent choice. Verify parameters suit your hardware."
      );
      // Simple parsing of params if visible in string, not strictly necessary for v1
    }
    // MD5 (32 hex chars) - Legacy detection
    else if (/^[a-f0-9]{32}$/i.test(hash)) {
      result.algorithm = "MD5";
      result.riskScore = 10;
      result.warnings.push("CRITICAL: MD5 is completely broken.");
      result.recommendations.push("MIGRATE IMMEDIATELY.");
    } else {
      result.warnings.push(
        "Unrecognized hash format. Could not analyze deep properties."
      );
      result.riskScore = 3; // Unknown risk
    }

    return result;
  }
}
