'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeController'
    });
}])

.controller('HomeController', ['$scope', 'EventfulService', '$location', function ($scope, EventfulService, $location) {

    var eventSelect = {
        comedy: undefined,
        concerts: undefined,
        conferences: undefined,
        festivals: undefined,
        food: undefined,
        family: undefined,
        nightlife: undefined,
        performingArts: undefined,
        sports: undefined
    }

    $scope.eventSelect = eventSelect;

    $scope.selectEventType = function (type) {
        $scope.eventSelect = _.mapObject(eventSelect, function (value, key) {
            if (key == type) {
                return "btn-image"
            }
        })
        $scope.eventType = type;
    }


    $scope.location = undefined;
    $scope.eventType = undefined;
    $scope.search = function () {
        if ($scope.location != undefined && $scope.eventType != undefined) {
            EventfulService.location = $scope.location;
            EventfulService.eventType = $scope.eventType;
            $location.path(['/events']);
        }
    }
}]);