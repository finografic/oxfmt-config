import type { OxfmtCssConfig } from 'oxfmt/types/oxfmt.types';

// NOTE: Oxfmt options that relate to CSS formatting.
// No specific CSS rules actually exist.

export const css = {
  htmlWhitespaceSensitivity: 'css', // "css" (default) | "strict" | "ignore",
  printWidth: 110,
  singleQuote: false,
} as const satisfies Partial<OxfmtCssConfig>;
