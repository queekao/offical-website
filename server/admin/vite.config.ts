import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.dev' })
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' })
}
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../public')
  },
  server: { port: 3333, host: '0.0.0.0', hmr: { overlay: true } },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy']
        }
      }
    })
  ]
})
