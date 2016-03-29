'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'home/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', "eventfulService", function ($scope, eventfulService) {
    $scope.location = undefined;
    $scope.eventType = undefined;
    $scope.search = function () {
        eventfulService.location = $scope.location;
        eventfulService.location = $scope.eventType;
        $location.path(['/events']);
        
    }
}]);