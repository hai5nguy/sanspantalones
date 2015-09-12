(function () {
    'use strict';
    
    angular.module('app')
        .directive('spComponentLlama', ComponentLlama);

    //the directive name is important spComponentLlama is used in markup like so: <sp-component-llamma></sp-component-llama>
        

    function ComponentLlama() {


        controller.$inject = [ '$scope' ]; //this is need for minification to work
        function controller($scope) {

        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/sandbox/componentllama/componentllama.template.html',
            controller: controller
        }
    }

})();