'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.events',
  'myApp.version',
  'myApp.ajax',
    "MyApp.directives",

  'ngStorage',
  'favorites',
    "MyApp.login",
    "MyApp.register"
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/view1'
    });
}]);