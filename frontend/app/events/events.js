'use strict';

angular.module('myApp.events', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events', {
    templateUrl: 'events/events.html',
    controller: 'EventCtrl'
  });
}])

.controller('EventCtrl', ['$scope', 'eventfulService', function($scope, eventfulService) {
    $scope.eventType = eventfulService.eventType;
    
    eventfulService.eventSearch().then(function (data) {
        $scope.events = data;
    })
}]);