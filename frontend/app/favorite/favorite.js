'use strict';


angular.module("myApp.favorites", ['myApp.ajax'])


    .config(['$routeProvider', '$sessionStorageProvider', function ($routeProvider, $sessionStorageProvider) {
        $routeProvider.when('/favorites', {
            templateUrl: 'events/events.html',
            controller: 'FavCtrl',
            resolve: {
                loggedIn : ['$q', 'UserService', '$location', function ($q, UserService, $location) {
                    if (UserService.isLoggedIn()) {
                        return 'Yeah!'
                    } else {
                        $location.path('/home')        
                    }
                }]
            }
        })
    }])

    .controller("FavCtrl", ["$scope", 'FavoritesService', function ($scope, FavoritesService){
        FavoritesService.getFavorites().then(function (events) {
            $scope.events = events;
            console.log(events)
        })
    }])