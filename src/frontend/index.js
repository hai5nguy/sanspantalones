(function() {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(appConfiguration);


    function appConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {
            
        $locationProvider.html5Mode(true);


        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/components/home/home.html'
            })
            .state('debug', {
                url: '/debug',
                templateUrl: '/components/debug/debug.html'
            });

        $urlRouterProvider.otherwise('/');
        
    }

})();