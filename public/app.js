(function() {
    'use strict';

    angular.module('app', [])
        .factory('login', function($http) {
            var changes = [];
            var change = function(data){
                changes.forEach(function(fn){
                    fn(data);
                });
            };
            return {
                login: function(user) {
                    return $http.post('/api/login', user).then(change);
                },
                logout: function() {
                    return $http.delete('/api/login').then(change);
                },
                isLogin: function() {
                    return $http.get('/api/login').then(change);
                },
                onchange: function(fn){
                    changes.push(fn);
                }
            };
        })
        .controller('MainCtrl', function($scope, login) {
            login.isLogin();
            $scope.logout = function() {
                login.logout();
            };
            login.onchange(function(data){
                $scope.loginInfo = data.data;
            });
        })
        .controller('LoginCtrl', ['login', '$scope',
            function(login, $scope) {
                var self = this;
                //self.login = login.login.bind(login);
                self.login = function(user) {login.login(user);};
                login.onchange(function(data){
                    self.loginInfo = data.data;
                });
            }
        ]);
})();
