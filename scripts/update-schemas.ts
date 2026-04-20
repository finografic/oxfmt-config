/**
 * Copies oxfmt + oxlint configuration schemas into internal/schemas/
 *
 * Usage: pnpm update.schemas → copies all pnpm update.schemas oxfmt → copies one
 */

import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ALLOWED_LIBS = ['oxfmt', 'oxlint'] as const;
type AllowedLib = (typeof ALLOWED_LIBS)[number];

const root = resolve(fileURLToPath(import.meta.url), '..', '..');

function copySchema(lib: AllowedLib): void {
  const src = resolve(root, `node_modules/${lib}/configuration_schema.json`);
  const dest = resolve(root, `internal/schemas/${lib}.schema.json`);

  copyFileSync(src, dest);
  console.log(`✓ ${lib} → internal/schemas/${lib}.schema.json`);
}

function parseArgs(argv: string[]): AllowedLib[] {
  const libs = argv.slice(2).filter((arg): arg is AllowedLib => ALLOWED_LIBS.includes(arg as AllowedLib));

  return libs.length > 0 ? libs : [...ALLOWED_LIBS];
}

function main(): void {
  try {
    const libs = parseArgs(process.argv);

    for (const lib of libs) {
      copySchema(lib);
    }
  } catch (error) {
    console.error('✗ Failed to copy schemas');
    throw error;
  }
}

main();
