'use strict';

angular.module('myApp.events', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events', {
    templateUrl: 'event-view/event-view.html',
    controller: 'EventViewCtrl'
  });
}])

.controller('EventViewCtrl', [function() {
    
}]);