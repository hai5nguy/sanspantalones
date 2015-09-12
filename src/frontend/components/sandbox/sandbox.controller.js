(function () {
    'use strict';

    angular.module('app')
        .controller('SandBoxController', SandBoxController);

    SandBoxController.$inject = [ '$scope', '$element', '$compile' ];  //this is need for minification to work

    function SandBoxController($scope, $element, $compile) {

        $scope.vm.addLlama = function () {

            console.log('adding llama');

            // debugger;
            
            var llama = $compile('<sp-component-llama></sp-component-llama>')($scope);
            $element.find('#llama-container').append(llama);

            debugger;
            
            
            // $scope.
        }

    }

})();