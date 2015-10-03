(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('PuppyChowController', PuppyChowController);

    PuppyChowController.$inject = [ '$scope', '$element', 'MessageService' ];  //this is need for minification to work

    function PuppyChowController($scope, $element, MessageService) {

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


    }


})();