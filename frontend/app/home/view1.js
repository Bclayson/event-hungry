'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'home/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', 'eventfulService', '$location', function ($scope, eventfulService, $location) {

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
            eventfulService.location = $scope.location;
            eventfulService.location = $scope.eventType;
            $location.path(['/events']);
        }
    }
}]);