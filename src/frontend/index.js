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
        
        var marcusfirstpage = {
        	root: {
        		url: '/s/myfirstpage',
        		templateUrl: '/components/marcusfirstpage_nocaps/testpage.html'
        	}
        }

        var matttestpage = {
            url: '/matttestpage',
            templateUrl: '/components/matttestpage/test.html'
        }

        var puppychow = {
            url: '/s/puppychow',
            templateUrl: '/components/puppychow/puppychow.html'
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
            .state('testpage', marcusfirstpage.root)
            .state('matttestpage', matttestpage)
            .state('puppychow', puppychow)
            .state('sandbox', sandbox.root)
            .state('sandbox.componentcow', sandbox.componentcow)
            .state('sandbox.componentkitty', sandbox.componentkitty)
            .state('debug', debug.root)
            .state('roomcheck', {
                url: '/:path',
                templateUrl: '/components/room/room.html'
            });

        $urlRouterProvider.otherwise('/');
        
    }

})();