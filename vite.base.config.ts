import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
})
