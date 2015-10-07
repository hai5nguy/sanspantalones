var express         = require('express');
var bodyParser      = require('body-parser');
var http            = require('http');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var passport        = require('passport');

var app = express();
var server = http.createServer(app);

require('./globals.js');  //must be first
require('./debug.js');
require('./core.js');
require('./mongo.js');
require('./passport.js')(passport);
var config = require('./server-config.js');

app.use(bodyParser.json());                                          // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));                  // to support URL-encoded bodies

var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongo')(session);
app.use(cookieParser('nopants'));

//add sessions and store to mongodb
app.use(session({
  secret: "nopants",
  cookie: {maxAge: 60*60*1000},  //1 hr expiration
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ db: 'sanspantalones', host: 'localhost', port: 27017, collection: 'sessions', autoreconnect: true })
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes.js')(app);


app.use(express.static(config.folder.dist));
app.use('/bower_components', express.static(config.folder.bower));   //i need someone to look into CDN with this as being fall back
if (SP_ENVIRONMENT === 'local') {
    app.use('/img', express.static(config.folder.img));              
}

app.get('/', config.route.index);
app.get('*', config.route.index);


require('./modules/socket.js')(server);


server.listen(SP_PORT, function () {
    console.log('Server online. Port:', SP_PORT, ' Environment:', SP_ENVIRONMENT);
});