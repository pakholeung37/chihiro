import { defineConfig } from 'tsup'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
})
