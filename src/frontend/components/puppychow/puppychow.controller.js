(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('PuppyChowController', PuppyChowController);

    PuppyChowController.$inject = [ '$scope', '$element', 'MessageService' ];  //this is need for minification to work

    function PuppyChowController($scope, $element, MessageService) {

        $scope.onChatKeyPress = function (e) {

            if (e.keyCode == 13) {

                var chatinput = $element.find('.chatinput');
                var message = chatinput.val();
                chatinput.val('');
                
                MessageService.post({ message: message }).then(function (result) {
                    var savedMessage = result.data;
                    var messageHtml = '<p><span>' + savedMessage._id + '</span> : <span>' + savedMessage.message + '</span></p>';
                    $('.chatlog').append($(messageHtml));
                }, function (error) {
                    var messageHtml = '<p>Something went terribly wrong with message posting</p>';
                    $('.chatlog').append($(messageHtml));
                    console.error(error);
                });


            }

            
        }

    }

})();