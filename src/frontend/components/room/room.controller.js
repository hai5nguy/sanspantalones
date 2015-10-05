(function () {
    'use strict';

    angular.module('app')
        .controller('RoomController', RoomController);

    RoomController.$inject = [ '$scope', '$element', '$compile', '$stateParams', 'MessageService', 'SocketService' ];  //this is need for minification to work

    function RoomController($scope, $element, $compile, $stateParams, MessageService, SocketService) {

        // console.log($stateParams);
        // debugger;
        // 
        // 
        
        // var socket = io('/');
        //     socket.on('news', function (data) {
        //     console.log(data);
        //     socket.emit('my other event', { my: 'data' });
        // });
        debugger;




        $scope.name = $stateParams.path;

        // $scope.test = function () {
        //     var llama = $compile('<sp-component-llama></sp-component-llama>')($scope.$new());
        //     $element.find('#llama-container').append(llama);
        // }
        // 
        
        loadChatLog();

        $scope.onChatKeyPress = onChatKeyPress;

        function onChatKeyPress(e) {
            if (e.keyCode == 13) {

                var chatInput = $element.find('.chatinput');
                var chatText = chatInput.val();
                chatInput.val('');
                
                MessageService.post({ text: chatText }).then(function (result) {
                    // var savedMessage = result.data;
                    // var messageHtml = '<p><span>' + savedMessage._id + '</span> : <span>' + savedMessage.message + '</span></p>';
                    // $('.chatlog').append($(messageHtml));
                    // 
                    loadChatLog();
                    
                }, function (error) {
                //     var messageHtml = '<p>Something went terribly wrong with message posting</p>';
                //     $('.chatlog').append($(messageHtml));
                    console.error(error);
                });
            }
        }

        function loadChatLog() {

            MessageService.get({ page: 1, size: 50 }).then(function (messages) {
                // debugger;
                $scope.messages = messages.reverse();
            }, function (error) {
                // debugger;
                console.error('can not get chatlog');
            });
        }



    } //RoomController



})();