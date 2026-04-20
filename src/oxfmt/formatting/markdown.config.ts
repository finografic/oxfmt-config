import type { OxfmtMarkdownConfig } from 'oxfmt/types/oxfmt.types';

export const markdown = {
  embeddedLanguageFormatting: 'off', // "auto" (default) | "off"
  printWidth: 110, // integer (default: 100)
  proseWrap: 'preserve', // "always" | "never" | "preserve" (default)
} as const satisfies Partial<OxfmtMarkdownConfig>;

/**
 * Relaxed markdown formatting for agent instruction docs.
 *
 * Currently identical to the standard `markdown` preset because oxfmt only handles formatting (whitespace,
 * wrapping, line endings), not structural linting (heading hierarchy, duplicate headings, etc.).
 *
 * The value of this preset is future-proofing: if oxfmt gains markdown structure rules, agent docs will
 * already have a separate, relaxed config.
 */
export const agentMarkdown = {
  embeddedLanguageFormatting: 'off',
  proseWrap: 'preserve',
  printWidth: 180,
} as const satisfies Partial<OxfmtMarkdownConfig>;
