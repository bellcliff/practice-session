(function() {
    'use strict';

    angular.module('app', [])
        .controller('LoginCtrl', ['$scope', '$http',
            function(scope, $http) {
                $http.get('/api/login').success(function(resp) {
                    scope.loginInfo = resp;
                });
                scope.logout = function() {
                    $http.delete('/api/login').success(function() {
                        scope.loginInfo = {};
                    });
                };
                scope.onLogin = function(info){
                    console.log(scope.info, info);
                    scope.loginInfo = info;
                };
            }
        ])
        .directive('loginForm', function($http) {
            return {
                templateUrl: 'login.html',
                scope: {
                    info: '=info2',
                    login2: '&'
                },
                link: function(scope) {
                    scope.login = function(user) {
                        $http.post('/api/login', user).then(function(data) {
                            // scope.info = data.data;
                            scope.login2({info: data.data});
                        });
                    };
                }
            };
        });
})();
