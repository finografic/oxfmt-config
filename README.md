# 🛠️ @finografic/oxfmt-config

> Shareable oxfmt formatter configuration for the finografic ecosystem

Composable presets for [oxfmt](https://oxc.rs/docs/guide/usage/formatter) — the Rust-powered, Prettier-compatible formatter from the Oxc/VoidZero ecosystem.

## Installation

```bash
pnpm add -D oxfmt @finografic/oxfmt-config
```

## Usage

Create a `oxfmt.config.ts` in your project root:

```ts
import { defineConfig } from 'oxfmt';
import { base, css, json, markdown, sorting, ignorePatterns } from '@finografic/oxfmt-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [], options: { ...markdown } },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ],
} satisfies ReturnType<typeof defineConfig>);
```

## Available Presets

| Preset       | Description                        | Key Options                                |
| ------------ | ---------------------------------- | ------------------------------------------ |
| `base`       | Foundation defaults (spread first) | `printWidth: 110`, `singleQuote`, `semi`   |
| `typescript` | TS/TSX-specific overrides          | Placeholder — no options set yet           |
| `markdown`   | Prose formatting                   | `proseWrap: "preserve"`, `printWidth: 110` |
| `json`       | JSON/JSONC files                   | `trailingComma: "none"`                    |
| `css`        | CSS/SCSS/Less files                | `printWidth: 80`, `singleQuote: false`     |
| `sorting`    | Import + package.json sorting      | `sortImports`, `sortPackageJson: false`    |

> **Note:** Never spread `$schema` inside a preset object — doing so silently resets all formatting to oxfmt defaults. Always set `$schema` directly in `defineConfig()`.

## Sorting groups

Composable import-sort group constants. Import whichever groups match your project structure and use them in `sortImports.customGroups` and `sortImports.groups`.

Source files: `src/config/sorting-groups/` (`base.groups.ts`, `client.groups.ts`, `server.groups.ts`, `react.groups.ts`, `presets.ts`).

| Constant                         | Group name         | Matches                                                                       |
| -------------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| `SORTING_GROUP_WORKSPACE`        | `workspace`        | `@finografic/**`, `@workspace/**`                                             |
| `SORTING_GROUP_LIB_UTILS`        | `lib-utils`        | `lib/**`, `utils/**` (with `./` variants)                                     |
| `SORTING_GROUP_TYPES_CONSTANTS`  | `types-constants`  | `types/**`, `constants/**`, `config/**` (with `./` variants)                  |
| `SORTING_GROUP_STYLES`           | `styles`           | `styles/**`, `*.css`, `*.scss`, `*.styles`                                    |
| `SORTING_GROUP_TESTS`            | `tests`            | `__tests__/**`, `*.test.*`, `*.spec.*`, `test-utils/**`                       |
| `SORTING_GROUP_REACT`            | `react`            | `react`, `react-dom`, `react/**`, `@react/**`                                 |
| `SORTING_GROUP_PAGES_COMPONENTS` | `pages-components` | `pages/**`, `components/**`                                                   |
| `SORTING_GROUP_HOOKS`            | `hooks`            | `hooks/**`, `providers/**`, `queries/**`                                      |
| `SORTING_GROUP_CLIENT_ROUTES`    | `client-routes`    | `routes/**` (client; separate from server routes)                             |
| `SORTING_GROUP_SERVER_ROUTES`    | `server-routes`    | `routes/**` (server apps)                                                     |
| `SORTING_GROUP_SERVER_LAYERS`    | `server-layers`    | `middlewares/**`, `db/**`, `schemas/**` (no `routes/**`; use `server-routes`) |
| `SORTING_GROUP_API`              | `api`              | `openapi/**`, `i18n/**`                                                       |

### Presets

Ready-made `customGroups` arrays live in `src/config/sorting-groups/presets.ts`:

| Export                | Typical use        |
| --------------------- | ------------------ |
| `SORT_PRESET_CLIENT`  | React / Vite / SPA |
| `SORT_PRESET_SERVER`  | Node HTTP APIs     |
| `SORT_PRESET_CLI`     | CLI tools          |
| `SORT_PRESET_LIBRARY` | Shared packages    |

Spread them into `sortImports.customGroups` and mirror the same group names in `sortImports.groups` (see client/server examples below).

### Agent instruction paths

`AGENT_DOC_PATHS`, `AGENT_DOC_MARKDOWN_PATHS`, and `agentMarkdown` are defined in `src/config/patterns/agent-docs.patterns.ts` for relaxed markdown formatting on AI instruction files (Copilot, Cursor, `AGENTS.md`, etc.). The root `oxfmt.config.ts` in this repo shows how to combine them with `overrides`.

When spreading `...sorting` and overriding `sortImports`, the explicit key wins — `sorting.rules` and `sorting.sortPackageJson` are still inherited from the spread.

### Migration from `SORTING_GROUP_HOOKS_ROUTES`

If you previously used `SORTING_GROUP_HOOKS_ROUTES` / `'hooks-routes'`, split into hooks and client routes:

```diff
- import { SORTING_GROUP_HOOKS_ROUTES } from '@finografic/oxfmt-config';
+ import { SORTING_GROUP_HOOKS, SORTING_GROUP_CLIENT_ROUTES } from '@finografic/oxfmt-config';
```

```diff
- 'hooks-routes',
+ 'hooks',
+ 'client-routes',
```

Server configs should list `'server-routes'` before `'server-layers'` when using `SORTING_GROUP_SERVER_ROUTES`.

## Monorepo Setup

In a monorepo, each package owns its `oxfmt.config.ts`. The examples below cover a typical split: a `client/` package running Vite + React + TypeScript, and a `server/` package running Node.js.

### Client — Vite + React + TypeScript (`client/`)

```ts
import { defineConfig } from 'oxfmt';
import {
  base,
  css,
  json,
  markdown,
  sorting,
  typescript,
  ignorePatterns,
  SORTING_GROUP_REACT,
  SORTING_GROUP_WORKSPACE,
  SORTING_GROUP_PAGES_COMPONENTS,
  SORTING_GROUP_HOOKS,
  SORTING_GROUP_CLIENT_ROUTES,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_STYLES,
  SORTING_GROUP_TESTS,
} from '@finografic/oxfmt-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  sortImports: {
    newlinesBetween: false,
    customGroups: [
      SORTING_GROUP_REACT,
      SORTING_GROUP_WORKSPACE,
      SORTING_GROUP_PAGES_COMPONENTS,
      SORTING_GROUP_HOOKS,
      SORTING_GROUP_CLIENT_ROUTES,
      SORTING_GROUP_LIB_UTILS,
      SORTING_GROUP_TYPES_CONSTANTS,
      SORTING_GROUP_STYLES,
      SORTING_GROUP_TESTS,
    ],
    groups: [
      'value-builtin',
      'react',
      'workspace',
      'value-external',
      'type-import',
      { newlinesBetween: true },
      'pages-components',
      'hooks',
      'client-routes',
      'lib-utils',
      'types-constants',
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
      { newlinesBetween: true },
      'styles',
      'tests',
      'unknown',
    ],
  },
  overrides: [
    { files: ['*.ts', '*.tsx'], excludeFiles: [], options: { ...typescript } },
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [], options: { ...markdown } },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ],
} satisfies ReturnType<typeof defineConfig>);
```

### Server — Node.js (`server/`)

```ts
import { defineConfig } from 'oxfmt';
import {
  base,
  json,
  markdown,
  sorting,
  typescript,
  ignorePatterns,
  SORTING_GROUP_WORKSPACE,
  SORTING_GROUP_SERVER_ROUTES,
  SORTING_GROUP_SERVER_LAYERS,
  SORTING_GROUP_API,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_TESTS,
} from '@finografic/oxfmt-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  sortImports: {
    newlinesBetween: false,
    customGroups: [
      SORTING_GROUP_WORKSPACE,
      SORTING_GROUP_SERVER_ROUTES,
      SORTING_GROUP_SERVER_LAYERS,
      SORTING_GROUP_API,
      SORTING_GROUP_LIB_UTILS,
      SORTING_GROUP_TYPES_CONSTANTS,
      SORTING_GROUP_TESTS,
    ],
    groups: [
      'value-builtin',
      'workspace',
      'value-external',
      'type-import',
      { newlinesBetween: true },
      'server-routes',
      'server-layers',
      'api',
      'lib-utils',
      'types-constants',
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
      'tests',
      'unknown',
    ],
  },
  overrides: [
    { files: ['*.ts'], excludeFiles: [], options: { ...typescript } },
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [], options: { ...markdown } },
  ],
} satisfies ReturnType<typeof defineConfig>);
```

## Source layout (this repo)

| Area                           | Path                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| Formatting presets             | `src/config/formatting/` (`base`, `typescript`, `json`, `markdown`, `css`, `sorting`, …) |
| Ignore globs + agent doc paths | `src/config/patterns/` (`ignore.patterns.ts`, `agent-docs.patterns.ts`, `index.ts`)      |
| Import-sort groups + presets   | `src/config/sorting-groups/` (`*.groups.ts`, `presets.ts`)                               |
| Public API                     | `src/index.ts` → `dist/index.mjs`                                                        |

The root `oxfmt.config.ts` imports from `./dist/index.mjs` (not `src/`) so the formatter always sees the built bundle; rebuild with `pnpm build` after editing `src/`.

## lint-staged

This repo runs **ESLint first, then oxfmt** on code and markdown, and oxfmt-only on JSON/YAML/TOML (see `package.json`):

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,mjs,cjs}": ["eslint --fix", "oxfmt --no-error-on-unmatched-pattern"],
    "*.md": ["eslint --fix", "oxfmt --no-error-on-unmatched-pattern"],
    "*.{json,jsonc,yml,yaml,toml}": ["oxfmt --no-error-on-unmatched-pattern"]
  }
}
```

The **pre-commit** hook runs `lint-staged` and then `oxfmt` on the whole tree (`oxfmt --no-error-on-unmatched-pattern`). After cloning or changing hook config, run `pnpm install` (or `npx simple-git-hooks`) so hooks stay registered.

## Editor Setup

Install the **Oxc** VS Code extension (`oxc.oxc-vscode`). This workspace uses `.vscode/settings.json` with **oxfmt** as the default formatter. **oxfmt** picks up `oxfmt.config.ts` (or other supported config names) at the project root automatically — you usually do **not** need `oxc.fmt.configPath` unless the config lives elsewhere. If you set `oxc.fmt.configPath`, use a real path; **`${workspaceFolder}` is not expanded** when passed to the formatter binary.

Minimal example:

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file"
}
```

See [oxc.rs formatter docs](https://oxc.rs/docs/guide/usage/formatter) and `.vscode/oxc.oxc-vscode.extension.md` for extension settings (oxlint, oxfmt paths, etc.).

## License

MIT © [Justin Rankin](https://github.com/finografic)
