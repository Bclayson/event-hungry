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


    FavoritesService.getFavoritesReferences().then(function (favoriteEvents) {
        $scope.favoriteEvents = favoriteEvents;
        EventfulService.eventSearch().then(function (data) {
            $scope.events = data.events.event;
        })
    })

    
    $scope.addtoFavorites = function ($index) {
        
        var ourEvent = $scope.events[$index];
        
        FavoritesService.addToFavorites({event_id: ourEvent.id, date: ourEvent.start_time}).then(function (event) {
            console.log(event)
        });
    

    }



}]);
