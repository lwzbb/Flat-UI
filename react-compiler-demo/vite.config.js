import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // 启用 React Compiler
          ['babel-plugin-react-compiler', {
            // Compiler 配置选项
            compilationMode: 'infer', // 自动推断模式（推荐）
            // runtimeModule: 'react-compiler-runtime', // 可选
          }],
        ],
      },
    }),
  ],
})
