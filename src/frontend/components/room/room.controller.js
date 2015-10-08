(function () {
    'use strict';

    angular.module('app')
        .controller('RoomController', RoomController);

    RoomController.$inject = [ '$scope', '$element', '$stateParams', 'RoomService'];  //this is need for minification to work

    function RoomController($scope, $element, $stateParams, RoomService) {

        var roomName = $stateParams.path;

        $scope.name = roomName;
        $scope.messages = [];

        RoomService.init({
            roomName: roomName
        });
        

        $scope.onChatKeyPress = function (e) {
            if (e.keyCode == 13) {

                var chatInput = $element.find('.chatinput');
                var messageText = chatInput.val();
                chatInput.val('');

                RoomService.sendMessage(messageText);
                
            }
        }

        RoomService.onNewMessage = function (message) {
            $scope.messages.push(message);
            $scope.$apply();
        }

    } //RoomController


})();