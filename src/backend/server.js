var Express     = require('express');
var bodyParser  = require('body-parser');


var express = Express();

var http = require('http');

var server = http.createServer(express);
var io = require('socket.io')(server);



require('./globals.js');  //must be first
require('./debug.js');
require('./core.js');
require('./mongo.js');
var config = require('./server-config.js');


express.use(bodyParser.json());                                          // to support JSON-encoded bodies
express.use(bodyParser.urlencoded({ extended: true }));                  // to support URL-encoded bodies

require('./routes/routes.js')(express);
require('./socket/socket.js')(express);


if (SP_ENVIRONMENT === 'local') {
    express.use('/img', Express.static(config.folder.img));              
}

express.get('/', config.route.index);


express.use(Express.static(config.folder.dist));
express.use('/bower_components', Express.static(config.folder.bower));   //i need someone to look into CDN with this as being fall back


express.get('*', config.route.index);

server.listen(SP_PORT, function () {
    console.log('Server online. Port:', SP_PORT, ' Environment:', SP_ENVIRONMENT);
});