# Setting Up oxfmt.config.ts

A guide to configuring oxfmt in this repo, including a critical gotcha that causes formatting options to silently fall back to defaults.

---

## How the config is structured

Formatting options are split into named presets under `src/config/formatting/`:

| Export           | Purpose                                    |
| ---------------- | ------------------------------------------ |
| `base`           | Core formatting (semi, quotes, width, etc) |
| `sorting`        | Import sorting groups and order            |
| `markdown`       | Prose-wrap and print-width overrides       |
| `css`            | CSS/SCSS quote override                    |
| `ignorePatterns` | Glob patterns to exclude from formatting   |

These are compiled to `dist/index.mjs` via `pnpm build` (tsdown). The root `oxfmt.config.ts` imports from the compiled dist — not from source.

---

## The `$schema` gotcha

### What goes wrong

The `base` object in `src/config/formatting/base.ts` includes a `$schema` property:

```ts
export const base = {
  $schema: './node_modules/oxfmt/configuration_schema.json',
  semi: false,
  singleQuote: false,
  // ...
};
```

`$schema` is a JSON meta-property used by editors for schema validation hints. It is **not** an oxfmt formatting option. When you spread `base` directly into `defineConfig()`, oxfmt sees `$schema` in the config object and treats it as a directive to re-initialize from the referenced schema file — which resets everything back to schema defaults (`semi: true`, `singleQuote: false`, etc.).

### Symptom

Files format with oxfmt defaults instead of your configured values — even though the values are correct in the dist. Directly setting `semi: false` in the config works. Spreading `...base` does not.

### The fix

**IMPORTANT:** `$schema` must be set inside of `defineConfig({...})`

```ts
import { defineConfig } from 'oxfmt';
import { base, sorting, markdown, json, css } from './dist/index.mjs';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns: [],
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [], options: { ...markdown } },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ],
} satisfies ReturnType<typeof defineConfig>);
```

The `$schema` prefix `_` silences the unused-variable lint rule.

### Why the other spreads (`sorting`, `markdown`, `css`) are unaffected

None of those objects include a `$schema` property. Only `base` does, because it was designed to be used as a standalone JSON-schema-aware config object as well as a spread source — and those two use cases conflict.

---

## Workflow: editing and testing

Because `oxfmt.config.ts` imports from `./dist/index.mjs`, **you must rebuild dist before changes to `src/` take effect**:

```bash
pnpm build        # rebuild dist
# or
pnpm dev          # rebuild on file change (tsdown --watch)
```

### Testing format behavior on save (VSCode)

1. Ensure `oxc.fmt.configPath` is set in `.vscode/settings.json` if you want to pin the config path explicitly:

   ```json
   "oxc.fmt.configPath": "oxfmt.config.ts"
   ```

   Without this, the oxc extension uses automatic config discovery. If multiple config files exist in the project root (e.g. `_.oxfmtrc.json`), discovery order may pick up the wrong one.

2. Open a test file with mixed formatting (semis + no-semis, mixed quotes).
3. Save. The formatter applies immediately if `editor.formatOnSave` is `true`.

### Verifying via CLI

```bash
# Format a specific file and check the output
npx oxfmt src/types/sorting.types.ts

# Check without writing (exit 1 if unformatted)
npx oxfmt --check src/types/sorting.types.ts
```

---

## Config object reference

The final merged config object that oxfmt receives looks like this (from `dist/index.mjs`):

```ts
// from base (minus $schema):
{
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  singleAttributePerLine: false,
  insertFinalNewline: true,
}

// from sorting:
{
  sortImports: { newlinesBetween: false, customGroups: [...], groups: [...] },
  rules: { 'typescript/no-import-type-side-effects': 'error' },
  sortPackageJson: false,
}
```

Per-file overrides are layered on top via the `overrides` array.
