import type { OxlintConfig } from 'oxlint';

export const IGNORE_PATTERNS_LINT = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/bin/**',
  '**/coverage/**',
  '**/.astro/**/*.{ts,tsx,js,mjs}',
  '**/.turbo/**',
  '*.d.ts',
  '**/*.min.*',
  '**/*.map',

  // ── Agent tooling internals (NOT agent docs) ────────
  // We intentionally avoid blanket ignores like '**/.github/**'
  // or '**/.cursor/**' because agent instruction files live there.
  // Instead, ignore only the non-doc subdirectories.
  '**/.claude/todos*',
  '**/.claude/settings*',
  '**/.github/workflows/**',
  '**/.github/ISSUE_TEMPLATE/**',
  '**/.github/PULL_REQUEST_TEMPLATE/**',
] as const satisfies OxlintConfig['ignorePatterns'];
