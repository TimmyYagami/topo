import vue from '@vitejs/plugin-vue'
import path from 'path'

export default {
  css: {},
  esbuild: {},
  alias: {
    "@": path.resolve(__dirname, "src")
  },
  plugins: [vue()]
}