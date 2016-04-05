var app = angular.module("MyApp.directives", [])

app.directive("event", function () {
    return {
        restrict: "E",
        scope: {
            events: '=' //attribute
        },
        templateUrl: "partials/events.html",
        controller: ['$scope', function ($scope) {
            $scope.formatDate = function (date) {
                return moment(date).format('MMMM Do YYYY, h:mm a');
            }
        }]
    }


})