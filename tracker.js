'use strict';
const fs = require('fs');
const bencode = require('bencode');
const http = require('http');

function Tracker(params) {
  this.torrent = bencode.decode(fs.readFileSync(params.fileName));
}

var myTracker = new Tracker({fileName: 'gatsby.torrent'});
console.log(myTracker.torrent.announce.toString('utf8'));
