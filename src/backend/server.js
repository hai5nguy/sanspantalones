var express = require('express');

var config = require('./server-config.js')
var server = express();

server.use('/', express.static(config.folder.dist));
server.use('/bower_components', express.static(config.folder.bower));
server.use('/*', express.static(config.file.index));                    //this is needed to remove hash from url
    
server.listen(SP_PORT, function () {
    console.log('Server online. Port:', SP_PORT, ' Environment:', SP_ENVIRONMENT);
});