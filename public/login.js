(function() {
    'use strict';
    angular.module('app').directive('myLogin', function() {
        return {
            templateUrl: 'login.html',
            scope: {
                user: '='
            },
            controller: 'LoginCtrl as loginCtrl'
        };
    });
})();
