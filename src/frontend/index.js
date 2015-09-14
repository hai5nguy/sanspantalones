(function() {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(appConfiguration);


    function appConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {
            
        $locationProvider.html5Mode(true);

        var home = {
            root: {
                url: '/',
                templateUrl: '/components/home/home.html'
            }
        }

        var sandbox = {
            root: {
                url: '/sandbox',
                templateUrl: '/components/sandbox/sandbox.html'
            },
            componentcow: {
                url: '',
                templateUrl: '/components/sandbox/componentcow/componentcow.html'
            },
            componentkitty: {
                url: '',
                templateUrl: '/components/sandbox/componentkitty/componentkitty.html',
            }
        }

        var debug = {
            root: {
                url: '/debug',
                templateUrl: '/components/debug/debug.html'
            }
        }

        $stateProvider
            .state('home', home.root)
            .state('sandbox', sandbox.root)
            .state('sandbox.componentcow', sandbox.componentcow)
            .state('sandbox.componentkitty', sandbox.componentkitty)
            .state('debug', debug.root);

        $urlRouterProvider.otherwise('/');
        
    }

})();