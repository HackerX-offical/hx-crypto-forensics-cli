#!/usr/bin/env node
import { Command } from "commander";
import { CLICommands } from "./cli/commands";
import { FormatUtils } from "./utils/formatting";
import { ValidationUtils } from "./utils/validation";

const program = new Command();

program
  .name("hx-crypto")
  .description("HX Crypto Forensics CLI - Educational Tool")
  .version("1.0.0");

program
  .command("hash")
  .description("Generate a cryptographic hash")
  .requiredOption("-p, --param <text>", "Input text to hash")
  .requiredOption(
    "-a, --algo <algorithm>",
    "Algorithm (sha256, bcrypt, argon2)"
  )
  .option("-r, --rounds <number>", "Cost factor (bcrypt only)", parseInt)
  .option("-m, --memory <number>", "Memory cost (argon2 only)", parseInt)
  .action(async (options: any) => {
    try {
      await CLICommands.hash(options.param, {
        algorithm: options.algo as any,
        saltRounds: options.rounds,
        memoryCost: options.memory,
      });
    } catch (e: any) {
      console.error(FormatUtils.error(e.message));
      process.exit(1);
    }
  });

program
  .command("analyze")
  .description("Analyze a hash string for algorithm and security risks")
  .requiredOption("--hash <string>", "The hash string to analyze")
  .action((options: any) => {
    CLICommands.analyze(options.hash);
  });

program
  .command("compare")
  .description("Verify if a plaintext password matches a hash")
  .requiredOption("-c, --candidate <text>", "Plaintext password candidate")
  .requiredOption("--hash <string>", "Target hash string")
  .action(async (options: any) => {
    await CLICommands.compare(options.candidate, options.hash);
  });

program
  .command("explain")
  .description("Learn about a cryptographic concept")
  .argument("<topic>", "Topic to explain (sha256, bcrypt, argon2, salt)")
  .action((topic: string) => {
    CLICommands.explain(topic);
  });

program.parse(process.argv);
