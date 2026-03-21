import type { OxfmtConfig } from 'oxfmt';

export const markdown = {
  proseWrap: 'preserve', // don't rewrap markdown prose
  printWidth: 110,
} as const satisfies Partial<OxfmtConfig>;
