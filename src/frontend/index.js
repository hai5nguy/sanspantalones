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

        var room = {
            root: {
                url: '/room',
                templateUrl: '/components/room/room.html'
            },

            test: {
                url: '/debug/roomtest',
                templateUrl: '/components/room/test.html'
            },
            new: {
                url: '/room-new',
                templateUrl: '/components/room/new-room.html'
            },
            old: {
                url: '/room-old',
                templateUrl: '/components/room/old-room.html'
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
            .state('room', room.root)
            .state('room-new', room.new)
            .state('room-old', room.old)
            .state('sandbox', sandbox.root)
            .state('sandbox.componentcow', sandbox.componentcow)
            .state('sandbox.componentkitty', sandbox.componentkitty)
            .state('debug', debug.root)
            .state('home', home.root);

        $urlRouterProvider.otherwise(function ($injector, $location) {

            // debugger;

            var path = $location.path();
            if (path === '/') {
                return path;
            } else if (path === '/awesomeroom') {
                return '/room-old';
            } else {
                return '/room-new'
            }

        });
        
    }

})();