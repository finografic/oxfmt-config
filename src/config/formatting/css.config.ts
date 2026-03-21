import type { OxfmtConfig } from 'oxfmt';

export const css = {
  printWidth: 80,
  singleQuote: false,
} as const satisfies Partial<OxfmtConfig>;
