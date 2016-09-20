'use strict';
const fs = require('fs');
const bencode = require('bencode');
const http = require('http');
const crypto = require('crypto');
const bignum = require('bignum');
const Buffer = require('buffer').Buffer;
const querystring = require('querystring');

function Tracker(params) {
  this.torrent = bencode.decode(fs.readFileSync(params.fileName));
  this.infoHash = this.generateInfoHash();
  this.totalSize = this.calculateTotalSize();
  this.peerID = this.generatePeerID();
  this.downloaded = 0;
  this.uploaded = 0;
  this.port = 6881;
}

Tracker.prototype.requestPeers = function() {
}

Tracker.prototype.buildAnnounceRequest = function() {
  let announceURL = this.torrent.announce.toString('utf8');
  let query = '?info_hash=' + escape(this.infoHash.toString('binary')) +
              '&peer_id=' + escape(this.peerID.toString('binary')) +
              '&port=' + this.port +
              '&uploaded=' + this.uploaded +
              '&downloaded=' + this.downloaded +
              '&left=' + (this.totalSize - this.downloaded)
  return announceURL + query;
}

Tracker.prototype.generateInfoHash = function() {
  const info = bencode.encode(this.torrent.info);
  return crypto.createHash('sha1').update(info).digest();
}

Tracker.prototype.calculateTotalSize = function() {
  return this.torrent.info.files ? this.torrent.info.files.map( file => file.length ).reduce( (a, b) => a + b ) : this.torrent.info.length;
}

Tracker.prototype.generatePeerID = function() {
  const id = crypto.randomBytes(20);
  Buffer.from('-VP0001-').copy(id, 0);
  return id;
}

module.exports = Tracker;
