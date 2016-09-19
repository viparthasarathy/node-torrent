'use strict';
const fs = require('fs');
const bencode = require('bencode');
const http = require('http');
const crypto = require('crypto');
const bignum = require('bignum');
const Buffer = require('buffer').Buffer;

function Tracker(params) {
  this.torrent = bencode.decode(fs.readFileSync(params.fileName));
}

Tracker.prototype.requestPeers = function() {
  const trackerURL = this.torrent.announce.toString('utf8');
}

Tracker.prototype.generateInfoHash = function() {
  const info = bencode.encode(this.torrent.info);
  return crypto.createHash('sha1').update(info).digest();
}

Tracker.prototype.calculateSize = function() {
  if (torrent.info.files) {
    const size = torrent.info.files.map( file => file.length ).reduce( (a, b) => a + b );
  } else {
    const size = torrent.info.length;
  }
  return bignum.toBuffer(size, {size: 8});
}

Tracker.prototype.generatePeerID = function() {
  const id = crypto.randomBytes(20);
  Buffer.from('-VP0001-').copy(id, 0);
  return id;
}

module.exports = Tracker;
