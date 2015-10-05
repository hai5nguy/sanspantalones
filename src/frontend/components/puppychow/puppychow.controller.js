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

                var chatInput = $element.find('.chatInput');
                var chatText = chatInput.val();
                chatInput.val('');
                
                MessageService.post({ text: chatText }).then(function (result) {
                    loadChatLog();
                }, function (error) {
                    console.error(error);
                });
            }
        }

        function loadChatLog() {

            MessageService.get({ page: 1, size: 50 }).then(function (messages) {
                $scope.messages = messages.reverse();
            }, function (error) {
                console.error('can not get chatlog');
            });
        }

    }

})();