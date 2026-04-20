import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

import { env, options, plugins } from '../dist/oxlint.mjs';

export default defineConfig({
  plugins,
  env,
  options,
  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },
} satisfies OxlintConfig);
