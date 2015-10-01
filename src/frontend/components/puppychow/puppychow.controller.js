(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('PuppyChowController', PuppyChowController);

    PuppyChowController.$inject = [ '$scope', '$element', 'MessageService' ];  //this is need for minification to work

    function PuppyChowController($scope, $element, MessageService) {

        $scope.onChatKeyPress = function (e) {
            //debugger;
            // var llama = $compile('<sp-component-llama></sp-component-llama>')($scope.$new());
            // $element.find('#llama-container').append(llama);
            // 
            // 
            // console.log($element.find('.chatinput'));
            // console.log(e);

            if (e.keyCode == 13) {

                debugger;
                var message = $element.find('.chatinput').val();
                // console.log(message);
                // 
                MessageService.post({ message: message }).then(function () {
                    
                    debugger;
                }, function () {
                    console.error('Unable to post message');
                    debugger;
                });


            }
            // if (e.keyCode)

            
        }

    }

})();