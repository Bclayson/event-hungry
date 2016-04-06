'use strict';

angular.module("myApp.favorites", ['ngStorage'])

    .config(['$routeProvider', '$sessionStorageProvider', function ($routeProvider, $sessionStorageProvider) {
        $routeProvider.when('/favorites', {
            templateUrl: 'favorite/favorite.html',
            controller: 'FavCtrl'
        })
    }])

    .controller("FavCtrl", ["$scope", 'FavoritesService', function ($scope, FavoritesService){
        FavoritesService.getFavorites().then(function (events) {
            $scope.favorites = events;
            console.log(events)
        })
    }])