module.exports = function (server) {
    var io = require('socket.io')(server);
    
    // var http = require('http').Server(server);
    // var io = require('socket.io')(http);

    io.on('connection', function(socket){
        // console.log('new connection made');
        socket.on('hi', function(data){
            console.log('yo ', data);
            // socket.emit('chat1', data);
        });
    });


    // // var app = require('express')();
    // var a = require('http').Server(server);
    // var io = require('socket.io')(a);
}
