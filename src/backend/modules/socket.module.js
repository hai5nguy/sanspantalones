module.exports = function (server) {
    var io = require('socket.io')(server);
    
    io.on('connection', function(socket) {
        console.log('new connection made');
        

        socket.on('join', function(args) {

            var name = args.roomName;

            console.log('join ', args);
            socket.join(name);

            socket.emit('join-success', {
                roomName: name
            });

        });

        socket.on('chat', function (args) {
            console.log('received chat: ', args);
            // console.log(_roomName);
            io.to(args.roomName).emit('new-chat', args );
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
