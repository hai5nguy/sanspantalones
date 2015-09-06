var express = require('express');

var server = express();

var port = process.env.port|| 5000;

server.use(express.static(__dirname + '/../../dist/'));

server.listen(port, function () {
    console.log('server running on port ', port);
});