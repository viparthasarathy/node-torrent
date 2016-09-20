const crypto = require('crypto');
const bencode = require('bencode');

function generatePeerID() {
  const id = crypto.randomBytes(20);
  Buffer.from('-VP0001-').copy(id, 0);
  return id;
}

function generateInfoHash(torrentInfo) {
  const info = bencode.encode(torrentInfo);
  return crypto.createHash('sha1').update(info).digest();
}

module.exports.generatePeerID = generatePeerID;
module.exports.generateInfoHash = generateInfoHash;
