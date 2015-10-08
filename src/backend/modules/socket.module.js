module.exports = function (server) {
    var io = require('socket.io')(server);
    
    io.on('connection', function(socket) {
        console.log('new connection made');
        

        socket.on('message', function (a,b,c) {
            console.log('message ',a,b,c);
        });


        socket.on('disconnect', function(a,b,c) {
            console.log('disconnect');
        });


    });


    return {
        addNewConnection: addNewConnection
    }


    function addNewConnection() {
        var id = 1;
    }

}
