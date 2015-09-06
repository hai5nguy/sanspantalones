var express = require('express');
var livereload = require('connect-livereload');

var server = express();

var port = process.env.port|| 5000;

server.use(livereload());
server.use(express.static(__dirname + '/../../dist/'));

server.listen(port, function () {
    console.log('server running on port ', port);
});