const Tracker = require('./tracker');

var myTracker = new Tracker({fileName: 'gatsby.torrent'});

console.log(myTracker.buildAnnounceRequest());
