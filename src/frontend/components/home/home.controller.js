(function (foo) {
    'use strict';

    angular.module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = [ '$scope', '$location' ];  //this is need for minification to work

    function HomeController($scope, $location) {

        $scope.url = $location.path();

    }

})();

