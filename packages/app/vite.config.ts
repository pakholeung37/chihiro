import { mergeConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteBaseConfig from '../../vite.base.config'

export default mergeConfig(viteBaseConfig, {
  plugins: [visualizer({ filename: './dist/bundle.html' })],
})
