const Tracker = require('./tracker');

var myTracker = new Tracker({fileName: 'gatsby.torrent'});

console.log(myTracker.torrent.announce.toString('utf8'));
