/**
 * Prints the resolved oxlint configuration as JSON.
 *
 * - With `--defaults`: resolves `scripts/oxlint-defaults.config.ts` and writes
 *   `internal/configs/oxlint-defaults.config.json` (snapshot).
 * - Otherwise: resolves the repo-root `oxlint.config.ts`, writes `internal/configs/oxlint.config.json`, prints
 *   JSON to stdout, and logs a success line.
 *
 * Run: `pnpm oxlint:config:capture` | `pnpm oxlint:config:capture:defaults`
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import pc from 'picocolors';

const root = fileURLToPath(new URL('..', import.meta.url));

const currentConfigPath = join(root, 'oxlint.config.ts');
const currentOutputPath = join(root, 'internal/configs/oxlint.config.json');
const defaultsConfigPath = join(root, 'scripts/oxlint-defaults.config.ts');
const defaultsOutputPath = join(root, 'internal/configs/oxlint-defaults.config.json');

async function oxlintPrintConfig(configPath: string): Promise<string> {
  const { stdout } = await execa('pnpm', ['exec', 'oxlint', '-c', configPath, '--print-config'], {
    cwd: root,
  });
  return stdout;
}

async function printOxlintConfig(): Promise<void> {
  const useDefaults = process.argv.includes('--defaults');

  if (useDefaults) {
    const stdout = await oxlintPrintConfig(defaultsConfigPath);
    const parsed: unknown = JSON.parse(stdout);
    const formatted = JSON.stringify(parsed, null, 2);
    mkdirSync(dirname(defaultsOutputPath), { recursive: true });
    writeFileSync(defaultsOutputPath, formatted, 'utf8');
    console.log(formatted);
    console.log(pc.green(`\n✓ Wrote ${pc.white(defaultsOutputPath)}\n`));
    return;
  }

  const stdout = await oxlintPrintConfig(currentConfigPath);
  const parsed: unknown = JSON.parse(stdout);
  const formatted = JSON.stringify(parsed, null, 2);
  mkdirSync(dirname(currentOutputPath), { recursive: true });
  writeFileSync(currentOutputPath, formatted, 'utf8');
  console.log(formatted);
  console.log(pc.green(`\n✓ Wrote ${pc.white(currentOutputPath)}\n`));
}

printOxlintConfig().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
