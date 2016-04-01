'use strict';

angular.module("myApp.favorites", [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/favorites', {
            templateUrl: 'events/events.html',
            controller: 'FavCtrl'
        })
    }])

    .controller("FavCtrl", ["$scope", 'FavoritesService', function ($scope, FavoritesService){
        FavoritesService.getFavorites().then(function (events) {
            $scope.events = events;
            console.log(events)
        })
    }])