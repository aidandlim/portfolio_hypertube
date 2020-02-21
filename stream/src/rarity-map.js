
class RarityMap {
  constructor (torrent) {
    this._torrent = torrent
    this._numPieces = torrent.pieces.length
    this._pieces = new Array(this._numPieces)

    this._onWire = wire => {
      this.recalculate()
      this._initWire(wire)
    }
    this._onWireHave = index => {
      this._pieces[index] += 1
    }
    this._onWireBitfield = () => {
      this.recalculate()
    }

    this._torrent.wires.forEach(wire => {
      this._initWire(wire)
    })
    this._torrent.on('wire', this._onWire)
    this.recalculate()
  }

  getRarestPiece (pieceFilterFunc) {
    let candidates = []
    let min = Infinity

    for (let i = 0; i < this._numPieces; ++i) {
      if (pieceFilterFunc && !pieceFilterFunc(i)) continue

      const availability = this._pieces[i]
      if (availability === min) {
        candidates.push(i)
      } else if (availability < min) {
        candidates = [i]
        min = availability
      }
    }

    if (candidates.length) {
      return candidates[Math.random() * candidates.length | 0]
    } else {
      return -1
    }
  }

  destroy () {
    this._torrent.removeListener('wire', this._onWire)
    this._torrent.wires.forEach(wire => {
      this._cleanupWireEvents(wire)
    })
    this._torrent = null
    this._pieces = null

    this._onWire = null
    this._onWireHave = null
    this._onWireBitfield = null
  }

  _initWire (wire) {
    wire._onClose = () => {
      this._cleanupWireEvents(wire)
      for (let i = 0; i < this._numPieces; ++i) {
        this._pieces[i] -= wire.peerPieces.get(i)
      }
    }

    wire.on('have', this._onWireHave)
    wire.on('bitfield', this._onWireBitfield)
    wire.once('close', wire._onClose)
  }

  recalculate () {
    this._pieces.fill(0)

    for (const wire of this._torrent.wires) {
      for (let i = 0; i < this._numPieces; ++i) {
        this._pieces[i] += wire.peerPieces.get(i)
      }
    }
  }

  _cleanupWireEvents (wire) {
    wire.removeListener('have', this._onWireHave)
    wire.removeListener('bitfield', this._onWireBitfield)
    if (wire._onClose) wire.removeListener('close', wire._onClose)
    wire._onClose = null
  }
}

module.exports = RarityMap
