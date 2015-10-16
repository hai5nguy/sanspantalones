(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('SignInService', SignInService);

    SignInService.$inject = [ ];

    function SignInService($resource) {
        return $resource('/signin');
    };

})();
