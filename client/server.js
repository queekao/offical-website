// const DEV_ENV = 'development'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import dotenv from 'dotenv'
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.dev' })
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' })
}
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 5174
const HOST = '0.0.0.0' // accept local and network
async function createServer(isProd = process.env.NODE_ENV === 'production') {
  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })
  app.use(vite.middlewares)
  app.use('*', async (req, res, next) => {
    const resolve = p => path.resolve(__dirname, p)
    const url = req.originalUrl
    const indexProd = isProd
      ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
      : ''

    try {
      let template, render

      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(
          path.resolve(__dirname, './index.html'),
          'utf-8'
        )
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render // this render method is from entry-server.tsx
      } else {
        template = indexProd
        render = (await import('./dist/server/entry-server.js')).render
      }
      const appHtml = render(url)
      const html = template.replace('<!--ssr-outlet-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
      next(e)
    }
  })

  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`)
  })
}

createServer()
