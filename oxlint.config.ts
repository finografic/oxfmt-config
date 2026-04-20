import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

import {
  rules,
  loosenRules,
  configOverrides,
  categories,
  ignorePatterns,
  options,
  env,
  plugins,
  testOverrides,
} from './dist/oxlint.mjs';

export default defineConfig({
  plugins: [...plugins],
  env,
  options,
  categories,
  rules: { ...rules, ...loosenRules },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...ignorePatterns],
} satisfies OxlintConfig);
