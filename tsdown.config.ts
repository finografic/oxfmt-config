import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: { legacy: true },
  entry: {
    index: 'src/index.ts',
    oxfmt: 'src/oxfmt/index.ts',
    oxlint: 'src/oxlint/index.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'esnext',
});
