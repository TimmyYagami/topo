import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  server: {
    proxy: {
      // 如果是 /lsbdb 打头，则访问地址如下
      '/sugrec': 'https://www.baidu.com',
      // 如果是 /lsbdb 打头，则访问地址如下
      '/lsbdb': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/lsbdb/, '')
      },
    },
  },
});
