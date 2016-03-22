(function() {
    'use strict';

    angular.module('app', [])
        .factory('login', function($http, $rootScope) {
            var loginInfo;
            var change = function(data) {
                loginInfo = data.data;
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
                getInfo: function(){
                    return loginInfo;
                }
            };
        })
        .controller('MainCtrl', function($scope, login) {
            $scope.login = login;
            login.isLogin();
            $scope.logout = function() {
                login.logout();
            };
            $scope.$watch('login.getInfo()', function(n, o) {
                $scope.loginInfo = n;
            });
        })
        .controller('LoginCtrl', function($scope, login) {
            $scope.login = login;
            var self = this;
            //self.login = login.login.bind(login);
            self.login = function(user) {
                login.login(user);
            };
            $scope.$watch('login.getInfo()', function(n, o) {
                self.loginInfo = n;
            });
        });
})();
