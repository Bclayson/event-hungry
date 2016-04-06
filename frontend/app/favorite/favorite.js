'use strict';


angular.module("myApp.favorites", ['myApp.ajax'])


    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/favorites', {

            templateUrl: 'favorite/favorite.html',
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
            $scope.favorites = events;
            console.log(events)
        })
    }])