import type { OxlintConfig } from 'oxlint';

import {
  categories,
  configOverrides,
  env,
  ignorePatterns,
  loosenRules,
  options,
  plugins,
  rules,
  testOverrides,
} from './index';

export const oxlintConfig = {
  plugins: [...plugins],
  env,
  options,
  categories,
  rules: { ...rules, ...loosenRules },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...ignorePatterns],
} satisfies OxlintConfig;
