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
  this.peers = [];
}

Tracker.prototype.requestPeers = function() {
  const requestPath = this.buildAnnounceRequest();
  const tracker = this;
  http.get(requestPath, function(response) {
    let peers = null;
    response.on('data', function(data) {
      peers = bencode.decode(data).peers;
    })
    response.on('end', function() {
      tracker.updatePeers(peers);
      console.log(tracker.peers);
      return;
    });
  });
};

Tracker.prototype.updatePeers = function(peers) {
  this.peers = [];
  let byteLength = peers.length;
  for (let i = 0; i < byteLength; i+= 6) {
    let ipAddress = peers.slice(i, i + 4).join(".");
    let port = peers.readUInt16BE(i + 4);
    this.peers.push(ipAddress + ":" + port);
  }
}

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
