import crypto from "crypto";
import bcrypt from "bcrypt";
import argon2 from "argon2";
import { HashAlgorithm, HashOptions, HashResult } from "../core/types";
import { ValidationUtils } from "../utils/validation";

export class HashEngine {
  static async hash(input: string, options: HashOptions): Promise<HashResult> {
    ValidationUtils.validateInputString(input);
    ValidationUtils.validateAlgorithm(options.algorithm);

    const startTime = performance.now();
    let hash = "";
    let salt = "";

    switch (options.algorithm) {
      case "sha256":
        hash = HashEngine.hashSHA256(input);
        salt = "N/A (Deterministic)";
        break;
      case "bcrypt":
        const rounds = options.saltRounds || 10;
        ValidationUtils.validateRounds(rounds);
        hash = await bcrypt.hash(input, rounds);
        salt = hash.substring(0, 29); // Extract salt part from bcrypt string
        break;
      case "argon2":
        // Default recommended options if not provided
        const argonOptions = {
          type: argon2.argon2id,
          memoryCost: options.memoryCost || 2048,
          timeCost: options.timeCost || 3,
          parallelism: options.parallelism || 1,
        };
        hash = await argon2.hash(input, argonOptions);
        // Extract salt usually requires custom split, for now we just say it's embedded
        salt = "Embedded in hash string";
        break;
    }

    const endTime = performance.now();

    return {
      algorithm: options.algorithm,
      hash,
      salt,
      params: options,
      executionTimeMs: endTime - startTime,
    };
  }

  private static hashSHA256(input: string): string {
    return crypto.createHash("sha256").update(input).digest("hex");
  }
}
