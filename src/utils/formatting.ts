import chalk from "chalk";

export class FormatUtils {
  static title(text: string): string {
    return chalk.bold.cyan(`\n=== ${text.toUpperCase()} ===\n`);
  }

  static success(text: string): string {
    return chalk.green(`✔ ${text}`);
  }

  static error(text: string): string {
    return chalk.red(`✖ ${text}`);
  }

  static warning(text: string): string {
    return chalk.yellow(`⚠ ${text}`);
  }

  static info(text: string): string {
    return chalk.blue(`ℹ ${text}`);
  }

  static code(text: string): string {
    return chalk.gray(text);
  }

  static keyVal(key: string, val: string | number): string {
    return `${chalk.bold(key)}: ${val}`;
  }
}
