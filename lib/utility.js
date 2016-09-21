'use strict';
const crypto = require('crypto');
const bencode = require('bencode');

function Utility() {}

Utility.prototype.generatePeerID = function() {
  const id = crypto.randomBytes(20);
  Buffer.from('-VP0001-').copy(id, 0);
  return id;
};

Utility.prototype.generateInfoHash = function(torrentInfo) {
  const info = bencode.encode(torrentInfo);
  return crypto.createHash('sha1').update(info).digest();
};

module.exports = new Utility();
