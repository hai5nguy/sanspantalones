(function () {
    'use strict';

    var app = angular.module('app');


    app.factory('RoomService', function () {

        var self = {
            sendMessage: sendMessage
        }

        var socket = io();

        socket.emit('hi', 'everyone');

        function sendMessage(args) {

            socket.emit('hi', 'everyone');

        }

        return self;
        


    });

})();
