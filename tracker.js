'use strict';
const fs = require('fs');
const bencode = require('bencode');
const http = require('http');
const crypto = require('crypto');

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




module.exports = Tracker;
