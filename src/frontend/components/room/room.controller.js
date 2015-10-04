(function () {
    'use strict';

    angular.module('app')
        .controller('RoomController', RoomController);

    RoomController.$inject = [ '$scope', '$element', '$compile', '$stateParams' ];  //this is need for minification to work

    function RoomController($scope, $element, $compile, $stateParams) {

        // console.log($stateParams);
        // debugger;
        // 
        $scope.name = $stateParams.path;

        // $scope.test = function () {
        //     var llama = $compile('<sp-component-llama></sp-component-llama>')($scope.$new());
        //     $element.find('#llama-container').append(llama);
        // }

    }

})();