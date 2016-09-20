'use strict';
const fs = require('fs');
const bencode = require('bencode');
const http = require('http');
const Buffer = require('buffer').Buffer;
const Utility = require('./utility');

function Tracker(params) {
  this.torrent = bencode.decode(fs.readFileSync(params.fileName));
  this.infoHash = Utility.generateInfoHash(this.torrent.info);
  this.totalSize = this.calculateTotalSize();
  this.peerID = Utility.generatePeerID();
  this.downloaded = 0;
  this.uploaded = 0;
  this.port = 6881;
}

Tracker.prototype.requestPeers = function() {
};

Tracker.prototype.buildAnnounceRequest = function() {
  const announceURL = this.torrent.announce.toString('utf8');
  const query = '?info_hash=' + escape(this.infoHash.toString('binary')) +
              '&peer_id=' + escape(this.peerID.toString('binary')) +
              '&port=' + this.port +
              '&uploaded=' + this.uploaded +
              '&downloaded=' + this.downloaded +
              '&left=' + (this.totalSize - this.downloaded)
  return announceURL + query;
};

Tracker.prototype.calculateTotalSize = function() {
  return this.torrent.info.files ? this.torrent.info.files.map( file => file.length ).reduce( (a, b) => a + b ) : this.torrent.info.length;
};

module.exports = Tracker;
