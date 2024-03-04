import reactRefresh from '@vitejs/plugin-react-refresh'
import type { UserConfig } from 'vite'
import path from 'path'

// Load the environment variables from the appropriate .env file
const config: UserConfig = {
  plugins: [reactRefresh()],
  assetsInclude: ['**/*.glb'],
  build: {
    outDir: 'dist',
    // rollupOptions: {
    //   input: 'src/entry-client.tsx'
    // },
    // sourcemap: true,
    cssCodeSplit: true,
    minify: 'terser',
    chunkSizeWarningLimit: 1500
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}

export default config
