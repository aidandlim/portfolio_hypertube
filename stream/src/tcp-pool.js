const arrayRemove = require('unordered-array-remove')
const net = require('net')

const Peer = require('./peer')

class TCPPool {
  constructor (client) {

    this.server = net.createServer()
    this._client = client

    this._pendingConns = []

    this._onConnectionBound = conn => {
      this._onConnection(conn)
    }

    this._onListening = () => {
      this._client._onListening()
    }

    this._onError = err => {
      this._client._destroy(err)
    }

    this.server.on('connection', this._onConnectionBound)
    this.server.on('listening', this._onListening)
    this.server.on('error', this._onError)

    this.server.listen(client.torrentPort)
  }

  destroy (cb) {

    this.server.removeListener('connection', this._onConnectionBound)
    this.server.removeListener('listening', this._onListening)
    this.server.removeListener('error', this._onError)

    this._pendingConns.forEach(conn => {
      conn.on('error', noop)
      conn.destroy()
    })

    try {
      this.server.close(cb)
    } catch (err) {
      if (cb) process.nextTick(cb)
    }

    this.server = null
    this._client = null
    this._pendingConns = null
  }

  _onConnection (conn) {
    const self = this

    if (!conn.remoteAddress) {
      conn.on('error', noop)
      conn.destroy()
      return
    }

    self._pendingConns.push(conn)
    conn.once('close', cleanupPending)

    const peer = Peer.createTCPIncomingPeer(conn)

    const wire = peer.wire
    wire.once('handshake', onHandshake)

    function onHandshake (infoHash, peerId) {
      cleanupPending()

      const torrent = self._client.get(infoHash)
      if (torrent) {
        peer.swarm = torrent
        torrent._addIncomingPeer(peer)
        peer.onHandshake(infoHash, peerId)
      } else {
        const err = new Error(
          `Unexpected info hash ${infoHash} from incoming peer ${peer.id}`
        )
        peer.destroy(err)
      }
    }

    function cleanupPending () {
      conn.removeListener('close', cleanupPending)
      wire.removeListener('handshake', onHandshake)
      if (self._pendingConns) {
        arrayRemove(self._pendingConns, self._pendingConns.indexOf(conn))
      }
    }
  }
}

function noop () {}

module.exports = TCPPool
