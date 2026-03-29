import type { OxfmtConfig } from 'oxfmt';

export const ignorePatterns = [
  '**/node_modules/**',
  '**/dist/**',
  '**/coverage/**',
  '**/.turbo/**',
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
] as const satisfies OxfmtConfig['ignorePatterns'];
