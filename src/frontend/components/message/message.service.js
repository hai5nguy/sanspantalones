(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('MessageService', MessageService);

    MessageService.$inject = [ '$http', '$q' ];  //this is needed for minification to work

    function MessageService($http, $q) {

        return {
            get: getMessageFromServer,
            post: postMessageToServer
        }

        function getMessageFromServer(args) {
            return $q(function (resolve, reject) {
                $http.get('/api/v1/message', { 
                    params: {
                        page: args.page,
                        size: args.size
                    }
                }).then(function (response) {
                    resolve(response.data);
                }, function (error) {
                    reject(error);
                });
            });
        }

        function postMessageToServer(message) {
            return $http.post('/api/v1/message', message);    
        }

    }

})();
