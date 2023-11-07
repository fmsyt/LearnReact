import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import fetchRandomCat from './fetchRandomCat.js'

/**
 *
 * @param { import('express').Express & import('express-ws').WithWebsocketMethod } app
 * @param { import('vite').ViteDevServer } vite
 * @param { string } projectRoot
 */
function handleCreateServer(app, vite, projectRoot) {

  const isProd = process.env.NODE_ENV === 'production'

  const resolve = (p) => path.resolve(projectRoot, p)
  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const wsClients = new Set()

  const cats = []
  setInterval(() => {

    if (wsClients.size === 0) {
      return
    }

    const func = async () => {
      const data = await fetchRandomCat()

      return {
        ...data,
        url: `https://cataas.com/cat/${data._id}`,
      }
    }

    func().then((cat) => {
      if (!cat) {
        return
      }

      wsClients.forEach((ws) => {
        ws.send(JSON.stringify({ method: "append", data: cat }))
      })

      cats.push(cat)
      if (cats.length > 50) {
        cats.shift()
      }

    })

  }, 10000)




  app.ws('/ws', (ws, req) => {
    // WebSocket 接続が確立されたときの処理
    console.log('WebSocket connection established')
    wsClients.add(ws)

    ws.send(JSON.stringify({ method: "init", data: cats }))

    // WebSocket からメッセージを受信したときの処理
    ws.on('message', (msg) => {
      console.log(`Received message: ${msg}`)
    })

    // WebSocket から切断されたときの処理
    ws.on('close', () => {
      console.log('WebSocket connection closed')
      wsClients.delete(ws)
    })
  })

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = indexProd
        render = (await import('./dist/server/entry-server.js')).render
      }

      const context = {}
      const appHtml = render(url, context)

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url)
      }

      const html = template.replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

}

export default handleCreateServer
