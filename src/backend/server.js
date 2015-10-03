var express     = require('express');
var bodyParser  = require('body-parser');

require('./globals.js');  //must be first
require('./core.js');
require('./mongo.js');
var config = require('./server-config.js');

var server = express();

server.use(bodyParser.json());                                          // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));                  // to support URL-encoded bodies

require('./routes/routes.js')(server);

if (SP_ENVIRONMENT === 'local') {
    require('./debug.js');
    server.use('/img', express.static(config.folder.img));              
}

server.use('/bower_components', express.static(config.folder.bower));   //i need someone to look into CDN with this as being fall back

//this must be last!!!!!
server.use('/', express.static(config.folder.dist));
server.use('/*', express.static(config.file.index));                    //this is needed to remove hash from url

server.listen(SP_PORT, function () {
    console.log('Server online. Port:', SP_PORT, ' Environment:', SP_ENVIRONMENT);
});