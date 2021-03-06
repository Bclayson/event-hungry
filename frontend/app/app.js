'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.events',
  'myApp.favorites',
  'myApp.version',
  'myApp.ajax',
  "MyApp.directives",
  'ngStorage',
  "MyApp.login",
  "MyApp.register"

])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }])

    .controller("AppController", ["$scope", "TokenService", '$location', function ($scope, TokenService, $location) {
        this.hasToken = TokenService.getToken;

        this.logout = function () {
            TokenService.removeToken()
            if ($location.path() === '/favorites') {
                $location.path('/home')
            }
        };
     }])