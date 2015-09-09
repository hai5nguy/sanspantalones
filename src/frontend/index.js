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

        var examples = {
            root: {
                url: '/examples',
                templateUrl: '/components/examples/examples.html'
            },
            componentcow: {
                url: '',
                templateUrl: '/components/examples/componentcow/componentcow.html'
            },
            componentkitty: {
                url: '',
                templateUrl: '/components/examples/componentkitty/componentkitty.html',
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
            .state('examples', examples.root)
            .state('examples.componentcow', examples.componentcow)
            .state('examples.componentkitty', examples.componentkitty)
            .state('debug', debug.root);

        $urlRouterProvider.otherwise('/');
        
    }

})();