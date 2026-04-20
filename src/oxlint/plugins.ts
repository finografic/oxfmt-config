import type { OxlintConfig } from 'oxlint';

export const plugins = [
  'eslint',
  'typescript',
  'unicorn',
  'react',
  'react-perf',
  'oxc',
  'import',
  'jsdoc',
  'node',
  'promise',
  'vitest',
] as const satisfies OxlintConfig['plugins'];
