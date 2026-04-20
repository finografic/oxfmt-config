import type { OxfmtReactConfig } from 'oxfmt/types/oxfmt.types';

// NOTE: Oxfmt options that relate to JSX / React formatting.
// No specific React rules actually exist.

export const react = {
  bracketSameLine: false,
  jsxSingleQuote: false,
  singleAttributePerLine: false,
} as const satisfies Partial<OxfmtReactConfig>;
