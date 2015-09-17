var MongoClient = require('../../node_modules/mongodb').MongoClient;

MongoClient.connect(SP_DB_CONNECTION_STRING, function (err, db) {
    if (err) {
        console.error('Unable to connect to mongo server.');
    } else {
        console.log('Connected to Mongo.');
        global.DB_SERVER = db;
    }
});