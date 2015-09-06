var express = require('express');

var config = require('./config.js')
var server = express();

if (SP_ENVIRONMENT === 'local') {
    server.use(require('connect-livereload')());                   //this must be call before the serving of any static files
}

server.use(express.static(config.folders.dist));
server.use('/bower_components', express.static(config.folders.bower));

server.listen(SP_PORT, function () {
    console.log('Sans Pantalones server running on port', SP_PORT);
});