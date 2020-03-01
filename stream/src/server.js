const arrayRemove = require('unordered-array-remove')
const escapeHtml = require('escape-html')
const http = require('http')
const mime = require('mime')
const pump = require('pump')
const rangeParser = require('range-parser')

function Server (torrent, opts = {}) {
  const server = http.createServer()
  if (!opts.origin) opts.origin = '*'

  const sockets = []
  const pendingReady = []
  let closed = false
  const _listen = server.listen
  const _close = server.close

  server.listen = (...args) => {
    closed = false
    server.on('connection', onConnection)
    server.on('request', onRequest)
    return _listen.apply(server, args)
  }

  server.close = cb => {
    closed = true
    server.removeListener('connection', onConnection)
    server.removeListener('request', onRequest)
    while (pendingReady.length) {
      const onReady = pendingReady.pop()
      torrent.removeListener('ready', onReady)
    }
    _close.call(server, cb)
  }

  server.destroy = cb => {
    sockets.forEach(socket => {
      socket.destroy()
    })

    if (!cb) cb = () => {}
    if (closed) process.nextTick(cb)
    else server.close(cb)
    torrent = null
  }

  function isOriginAllowed (req) {
    if (opts.origin === false) return false
    if (req.headers.origin == null) return false
    if (opts.origin === '*') return true

    return req.headers.origin === opts.origin
  }

  function onConnection (socket) {
    socket.setTimeout(36000000)
    sockets.push(socket)
    socket.once('close', () => {
      arrayRemove(sockets, sockets.indexOf(socket))
    })
  }

  function onRequest (req, res) {
    if (opts.hostname && req.headers.host !== `${opts.hostname}:${server.address().port}`) {
      return req.destroy()
    }

    const pathname = new URL(req.url, 'http://example.com').pathname

    if (isOriginAllowed(req)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    }

    res.setHeader('X-Content-Type-Options', 'nosniff')

    res.setHeader('Content-Security-Policy', "base-uri 'none'; default-src 'none'; frame-ancestors 'none'; form-action 'none';")

    if (pathname === '/favicon.ico') {
      return serve404Page()
    }

    if (req.method === 'OPTIONS') {
      if (isOriginAllowed(req)) return serveOptionsRequest()
      else return serveMethodNotAllowed()
    }

    if (req.method === 'GET' || req.method === 'HEAD') {
      if (torrent.ready) {
        handleRequest()
      } else {
        pendingReady.push(onReady)
        torrent.once('ready', onReady)
      }
      return
    }

    return serveMethodNotAllowed()

    function serveOptionsRequest () {
      res.statusCode = 204
      res.setHeader('Access-Control-Max-Age', '600')
      res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD')

      if (req.headers['access-control-request-headers']) {
        res.setHeader(
          'Access-Control-Allow-Headers',
          req.headers['access-control-request-headers']
        )
      }
      res.end()
    }

    function onReady () {
      arrayRemove(pendingReady, pendingReady.indexOf(onReady))
      handleRequest()
    }

    function handleRequest () {
      if (pathname === '/') {
        return serveIndexPage()
      }

      const index = Number(pathname.split('/')[1])
      if (Number.isNaN(index) || index >= torrent.files.length) {
        return serve404Page()
      }

      const file = torrent.files[index]
      serveFile(file)
    }

    function serveIndexPage () {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')

      const listHtml = torrent.files
        .map((file, i) => (
          `<li>
            <a
              download="${escapeHtml(file.name)}"
              href="${escapeHtml(i)}/${escapeHtml(file.name)}"
            >
              ${escapeHtml(file.path)}
            </a>
            (${escapeHtml(file.length)} bytes)
          </li>`
        )).join('<br>')

      const html = getPageHTML(
        `${escapeHtml(torrent.name)} - HyperTube`,
        `
          <h1>${escapeHtml(torrent.name)}</h1>
          <ol>${listHtml}</ol>
        `
      )
      res.end(html)
    }

    function serve404Page () {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')

      const html = getPageHTML(
        '404 - Not Found',
        '<h1>404 - Not Found</h1>'
      )
      res.end(html)
    }

    function serveFile (file) {
      res.statusCode = 200
      res.setHeader('Content-Type', mime.getType(file.name) || 'application/octet-stream')

      res.setHeader('Accept-Ranges', 'bytes')

      res.setHeader(
        'Content-Disposition',
        `inline; filename*=UTF-8''${encodeRFC5987(file.name)}`
      )

      res.setHeader('transferMode.dlna.org', 'Streaming')
      res.setHeader(
        'contentFeatures.dlna.org',
        'DLNA.ORG_OP=01;DLNA.ORG_CI=0;DLNA.ORG_FLAGS=01700000000000000000000000000000'
      )

      let range = rangeParser(file.length, req.headers.range || '')

      if (Array.isArray(range)) {
        res.statusCode = 206

        range = range[0]

        res.setHeader(
          'Content-Range',
          `bytes ${range.start}-${range.end}/${file.length}`
        )
        res.setHeader('Content-Length', range.end - range.start + 1)
      } else {
        range = null
        res.setHeader('Content-Length', file.length)
      }

      if (req.method === 'HEAD') {
        return res.end()
      }

      pump(file.createReadStream(range), res)
    }

    function serveMethodNotAllowed () {
      res.statusCode = 405
      res.setHeader('Content-Type', 'text/html')
      const html = getPageHTML(
        '405 - Method Not Allowed',
        '<h1>405 - Method Not Allowed</h1>'
      )
      res.end(html)
    }
  }

  return server
}

function getPageHTML (title, pageHtml) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body>
        ${pageHtml}
      </body>
    </html>
  `
}

function encodeRFC5987 (str) {
  return encodeURIComponent(str)
    .replace(/['()]/g, escape)
    .replace(/\*/g, '%2A')
    .replace(/%(?:7C|60|5E)/g, unescape)
}

module.exports = Server
