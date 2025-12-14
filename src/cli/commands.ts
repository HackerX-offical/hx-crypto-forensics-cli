import chalk from "chalk";
import { HashEngine } from "../engines/HashEngine";
import { AnalysisEngine } from "../engines/AnalysisEngine";
import { ExplainerService } from "../explainers/ExplainerService";
import { FormatUtils } from "../utils/formatting";
import { HashOptions } from "../core/types";

export class CLICommands {
  static async hash(input: string, options: HashOptions) {
    try {
      console.log(FormatUtils.title(`Generating ${options.algorithm} Hash`));
      const result = await HashEngine.hash(input, options);

      console.log(FormatUtils.keyVal("Input", input));
      console.log(FormatUtils.keyVal("Algorithm", result.algorithm));
      console.log(
        FormatUtils.keyVal("Time", `${result.executionTimeMs.toFixed(3)}ms`)
      );
      console.log(FormatUtils.keyVal("Salt", result.salt));
      console.log(FormatUtils.keyVal("Hash", result.hash));

      // Educational Tip
      console.log(
        "\n" +
          FormatUtils.info(
            ExplainerService.getExplanation(options.algorithm).content
          )
      );
    } catch (error: any) {
      console.log(FormatUtils.error(error.message));
    }
  }

  static analyze(hashStr: string) {
    console.log(FormatUtils.title("Forensic Analysis"));
    const analysis = AnalysisEngine.analyze(hashStr);

    console.log(FormatUtils.keyVal("Detected Algorithm", analysis.algorithm));
    console.log(FormatUtils.keyVal("Risk Score", `${analysis.riskScore}/10`));

    if (analysis.properties.rounds) {
      console.log(
        FormatUtils.keyVal("Cost Factor", analysis.properties.rounds)
      );
    }

    if (analysis.warnings.length > 0) {
      console.log("\n" + chalk.bold.yellow("Warnings:"));
      analysis.warnings.forEach((w) => console.log(chalk.yellow(`- ${w}`)));
    }

    if (analysis.recommendations.length > 0) {
      console.log("\n" + chalk.bold.green("Recommendations:"));
      analysis.recommendations.forEach((r) =>
        console.log(chalk.green(`- ${r}`))
      );
    }
  }

  static async compare(candidate: string, hashStr: string) {
    console.log(FormatUtils.title("Hash Comparison"));

    // Simple bcrypt check for now as it's the most common "comparison" use case
    // For a generic tool, we'd need to identify algo first then compare.
    // For educational purposes, we simulate the "Verify" process.

    // We can use our AnalysisEngine to guess algo
    const analysis = AnalysisEngine.analyze(hashStr);
    let match = false;
    let method = "";

    try {
      if (analysis.algorithm === "Bcrypt") {
        const bcrypt = require("bcrypt");
        match = await bcrypt.compare(candidate, hashStr);
        method = "Bcrypt Compare";
      } else if (analysis.algorithm === "Argon2") {
        const argon2 = require("argon2");
        match = await argon2.verify(hashStr, candidate);
        method = "Argon2 Verify";
      } else if (analysis.algorithm.startsWith("SHA-256")) {
        const crypto = require("crypto");
        const candidateHash = crypto
          .createHash("sha256")
          .update(candidate)
          .digest("hex");
        match = candidateHash === hashStr;
        method = "String Equality (Unsalted)";
      } else {
        console.log(
          FormatUtils.warning(
            "Unsupported algorithm for direct comparison in this version."
          )
        );
        return;
      }

      if (match) {
        console.log(FormatUtils.success(`Match Verified! Method: ${method}`));
      } else {
        console.log(FormatUtils.error(`Mismatch! Method: ${method}`));
      }
    } catch (e: any) {
      console.log(FormatUtils.error(`Comparison failed: ${e.message}`));
    }
  }

  static explain(topic: string) {
    const explanation = ExplainerService.getExplanation(topic);
    console.log(FormatUtils.title(explanation.title));
    console.log(explanation.content);
    console.log("\n" + chalk.bold("Technical Details:"));
    console.log(explanation.technicalDetails);

    if (explanation.example) {
      console.log("\n" + chalk.bold("Example:"));
      console.log(FormatUtils.code(explanation.example));
    }
  }
}
