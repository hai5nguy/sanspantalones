(function () {
    'use strict';

    var app = angular.module('app');


    app.factory('SocketService', function () {
        
        var socket = io();
        debugger;
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });

    });

})();
