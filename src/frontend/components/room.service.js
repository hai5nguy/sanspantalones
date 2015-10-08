(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('RoomService', RoomService);

    RoomService.$inject = [ '$q' ];

    function RoomService($q) {

        var self = {
            init: init,
            onNewMessage: null,
            sendMessage: sendMessage
        }

        var _socket;
        var _roomName;

        function init(args) {
            _roomName = args.roomName;
            _socket =  io();
            _socket.on('connect', function () {
                _socket.emit('join', { roomName: _roomName });
                console.log('join ', args);
            });

            _socket.on('join-success', function () {
                console.log('join-success ');
                _socket.on('new-chat', function (args) {
                    console.log('new chat', args);
                    if (typeof self.onNewMessage === 'function') {
                        self.onNewMessage(args);
                    }
                });

            });


        }

        function sendMessage(messageText) {
            _socket.emit('chat', { 
                roomName: _roomName, 
                text: messageText 
            });

            //todo: implement error handling

        }

        return self;

    };

})();
