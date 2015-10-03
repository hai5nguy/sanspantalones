var MongoClient = require('../../node_modules/mongodb').MongoClient;

MongoClient.connect(SP_DB_CONNECTION_STRING, function (err, db) {
    if (err) {
        console.error('Unable to connect to mongo server.');
    } else {
        console.log('Mongo online:', SP_DB_CONNECTION_STRING);
        global.DB_SERVER = db;
    }
});