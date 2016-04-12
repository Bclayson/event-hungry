var app = angular.module("MyApp.directives", [])

app.directive("event", function () {
    return {
        restrict: "E",
        scope: {
            events: '=',
            favorites: '=',
            click: "&",
            name: "@"
        },
        self: this,
        templateUrl: "partials/events.html",
        controller: ['$scope', '$timeout', function ($scope, $timeout) {

            $scope.$watch('favorites', function (newVal, oldVal) {
                var favoriteIDs = _.pluck($scope.favorites, 'event_id');

                $scope.isInFavorites = function (id) {
                    if (_.isUndefined($scope.favorites)) {
                        return false
                    }
                    return _.contains(favoriteIDs, id)
                };

                $scope.formatDate = function (date) {
                    return moment(date).format('MMMM Do YYYY, h:mm a');
                };

                $scope.buttonClick = function (index) {
                    $scope.click({index: index})
                    var id = $scope.events[index].id;
                    favoriteIDs.push(id)
                };


            });





        }]
    }


})