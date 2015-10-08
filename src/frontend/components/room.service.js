(function () {
    'use strict';

    var app = angular.module('app');


    app.factory('RoomService', function () {

        var self = {
            join: join,
            sendMessage: sendMessage
        }

        var socket = io();

        socket.emit('hi', 'everyone');


        function join(args) {
            var name = args.name;

        }

        socket.on('connect', function () {
            socket.send('blah', 'blah2');
            console.log('connect');
        });


        //         var socket = io();
        // debugger;
        // socket.on('news', function (data) {
        //     console.log(data);
        //     socket.emit('my other event', { my: 'data' });
        // });

        function sendMessage(args) {

            socket.emit('hi', 'everyone');

        }

        return self;
        


    });

})();
