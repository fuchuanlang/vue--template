import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 9001,
    open: true,
    proxy: {
      '/api': {
        target: '要代理的地址',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'), // @代替src
      '#': path.resolve('./types'), // #代替types
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/index.scss";',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'pinia', 'vue-router'],
          elementIcons: ['@element-plus/icons-vue'],
        },
      },
    },
  },
});
