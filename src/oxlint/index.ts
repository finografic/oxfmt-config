// ── oxlint: composable linting pieces ─────────────────
export { categories } from './categories';
export { options } from './options';
export { env } from './env';
export { plugins } from './plugins';

// ── oxlint: composable linting pieces ─────────────────
export { baseRules } from './rules/base.rules';
export { typescriptRules } from './rules/typescript.rules';
export { loosenRules } from './rules/loosen.rules';
export { rules } from './rules/index';

// ── oxlint: composable linting pieces ─────────────────
export { configOverrides } from './overrides/config.overrides';
export { testOverrides } from './overrides/test.overrides';

// ── shared patterns ───────────────────────────────────
export { IGNORE_PATTERNS_LINT as ignorePatterns } from './ignore.patterns';
