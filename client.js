'use strict';

const fs = require('fs');
const torrent = fs.readFileSync('gatsby.torrent');

console.log(torrent.toString('utf8'));
