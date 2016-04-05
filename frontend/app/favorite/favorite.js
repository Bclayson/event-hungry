angular
    .module("favorites", [])
    .controller("FavCtrl", ["$scope", '$localStorage', function ($scope, $localStorage) {

        $scope.removeFavorite = function ($index) {
            $localStorage.favoriteEvents.splice($index, 1);
        }
        
    }])