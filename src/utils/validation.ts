/**
 * Validates input for cryptographic operations to ensure safety and correctness.
 * Strict defensive programming: Fail fast, fail loud on bad input.
 */

export class ValidationUtils {
  static validateInputString(input: string): void {
    if (!input || input.length === 0) {
      throw new Error("Input string cannot be empty.");
    }
    if (input.length > 1024) {
      throw new Error(
        "Input string too long. Max 1024 chars for this educational tool."
      );
    }
  }

  static validateAlgorithm(
    algo: string
  ): algo is "sha256" | "bcrypt" | "argon2" {
    const valid = ["sha256", "bcrypt", "argon2"];
    if (!valid.includes(algo)) {
      throw new Error(
        `Invalid algorithm: ${algo}. Supported: ${valid.join(", ")}`
      );
    }
    return true;
  }

  static validateRounds(rounds: number): void {
    if (typeof rounds !== "number" || rounds < 4 || rounds > 31) {
      throw new Error("Bcrypt rounds must be between 4 and 31.");
    }
  }
}
