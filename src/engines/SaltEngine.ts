import crypto from "crypto";

export class SaltEngine {
  /**
   * Generates a cryptographically secure random salt.
   * @param lengthBytes Length of salt in bytes (default 16)
   */
  static generateSalt(lengthBytes: number = 16): string {
    return crypto.randomBytes(lengthBytes).toString("hex");
  }

  /**
   * Educational simulation: Shows what happens if you reuse salts (BAD).
   */
  static simulateSaltReuseExample(
    input1: string,
    input2: string,
    salt: string
  ): { hash1: string; hash2: string; analysis: string } {
    const hash1 = crypto
      .createHash("sha256")
      .update(input1 + salt)
      .digest("hex");
    const hash2 = crypto
      .createHash("sha256")
      .update(input2 + salt)
      .digest("hex");

    let analysis = "Salts make identical passwords have different hashes.";
    if (input1 === input2) {
      analysis =
        "WARNING: Identical inputs with SAME SALT produce IDENTICAL HASHES. This makes Rainbow Table attacks possible.";
    }

    return { hash1, hash2, analysis };
  }
}
