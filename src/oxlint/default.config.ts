import type { OxlintConfig } from 'oxlint';

import { configOverrides, testOverrides } from './index';
import { oxlintLibraryConfig } from './presets/library.preset';

export const oxlintConfig = {
  ...oxlintLibraryConfig,
  overrides: [testOverrides, configOverrides],
} satisfies OxlintConfig;
