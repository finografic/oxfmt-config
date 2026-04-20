import type { DummyRuleMap } from 'oxlint';

/**
 * Base Oxlint rule overrides shared by this config package.
 *
 * References:
 *
 * - Full rules catalog: https://oxc.rs/docs/guide/usage/linter/rules.html#rules
 * - Fixable-only filter: https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&has_fix=true#rules
 */
export const loosenRules: DummyRuleMap = {
  'eslint/no-await-in-loop': 'off',
};
