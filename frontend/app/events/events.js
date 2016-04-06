'use strict';

angular.module('myApp.events', ['ngRoute'])


.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/events', {
        templateUrl: 'events/events.html',
        controller: 'EventCtrl'
    });
}])

.controller('EventCtrl', ['$scope', 'EventfulService', 'FavoritesService', function ($scope, EventfulService, FavoritesService) {
    $scope.eventType = EventfulService.eventType;

    EventfulService.eventSearch().then(function (data) {
        $scope.events = data.events.event;
        console.log($scope.events)
    })

    
    $scope.addtoFavorites = function ($index) {
        
        var ourEvent = $scope.events[$index];
        console.log(ourEvent);
        
        FavoritesService.addToFavorites({_id: ourEvent.id, date: ourEvent.start_time}).then(function (event) {
            console.log(event)
        });
    

    }



}]);
