var express     = require('express');
var bodyParser  = require('body-parser');
var cookieParser= require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


require('./globals.js');  //must be first
require('./core.js');
require('./mongo.js');
require('./passport.js')(passport);
var config = require('./server-config.js');

var server = express();

var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongo')(session);
server.use(bodyParser.json());                                          // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));                  // to support URL-encoded bodies
server.use(cookieParser('nopants'));

//add sessions and store to mongodb
server.use(session({
  secret: "nopants",
  cookie: {maxAge: 60*60*1000},  //1 hr expiration
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ db: 'sanspantalones', host: 'localhost', port: 27017, collection: 'sessions', autoreconnect: true })
}));

server.use(passport.initialize());
server.use(passport.session());

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