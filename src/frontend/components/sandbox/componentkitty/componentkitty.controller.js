(function (foo) {
    'use strict';

    angular.module('app')
        .controller('ComponentKittyController', ComponentKittyController);

    ComponentKittyController.$inject = [ '$scope' ];  //this is need for minification to work

    function ComponentKittyController($scope) {

        $scope.handleClick = function () {
            $(event.currentTarget).toggleClass('clicked');
        }

    }

})();

