'use strict';
const Tracker = require('./tracker');

var myTracker = new Tracker({fileName: process.argv[2]});

console.log(myTracker.requestPeers());
