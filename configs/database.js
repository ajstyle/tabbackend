// // configs/database.js

// 'use strict';

// // dependencies
// const mongoose = require('mongoose');

// // set the database name
// const dbName = 'youtubechannel';

// // connect to the database
// mongoose.connection.openUri('mongodb://tabsapp:tabsapp@ds161455.mlab.com:61455/tabsapp');

// // get notified if the connection
// // was successful or not
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log(`Connected to the ${dbName} database`);
// });


// mongoose 4.3.x
var mongoose = require('mongoose');

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

var mongodbUri = 'mongodb://tabsapp:tabsapp@ds161455.mlab.com:61455/tabsapp';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
    // Wait for the database connection to establish, then start the app.
    console.log(`Connected to the tabsapp database`);
});