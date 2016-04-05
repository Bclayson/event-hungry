'use strict';

angular.module('myApp.events', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/events', {
        templateUrl: 'events/events.html',
        controller: 'EventCtrl'
      });
    }])

    .controller('EventCtrl', ['$scope', 'EventfulService', function($scope, EventfulService) {
        $scope.eventType = EventfulService.eventType;

        EventfulService.eventSearch().then(function (data) {
            $scope.events = data.events.event;
            console.log($scope.events)
        })




    }]);