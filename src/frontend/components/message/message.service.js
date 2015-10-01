(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('MessageService', MessageService);

    MessageService.$inject = [ '$http', '$q' ];  //this is need for minification to work

    function MessageService($http, $q) {

        return {
            get: getMessageFromServer,
            post: postMessageToServer
        }

        function getMessageFromServer(args) {
            return $http.get('/api/v1/message')
        }

        function postMessageToServer(message) {
            return $http.post('/api/v1/message', message);    
        }

    }

})();

// localLearnersApp.factory('ClassesService', function ($http, $q) {

//     const _UPCOMING_CLASSES_TTL = 60000;

//     var upcomingClassesPromise = null;

//     return {
//         postUpcomingClasses: postUpcomingClasses,
//         //getCategories: getCategories,
//         //getRequestedClasses: getRequestedClasses,
//         getRequestedClass: getRequestedClass
//     }

   

//     function postUpcomingClasses(upcomingClass) {
//         return $http.post('/upcomingclasses', upcomingClass);
//     }


    
//     function getRequestedClass(id) {
//         var defer = $q.defer();
//         $http.get('/api/requested/' + id).then(
//             function (response) {
//                 defer.resolve(response.data);
//             },
//             function (err) {
//                 defer.reject(err);
//             }
//         );
//         return defer.promise;
//     }

// })
