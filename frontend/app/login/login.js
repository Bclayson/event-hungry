var app = angular.module("MyApp.login", []);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: "login/login.html",
        controller: "LoginController"
    })
}]);

app.controller("LoginController", ['$scope', 'UserService', '$location', function ($scope, UserService, $location) {
    $scope.login = function (username, password) {
        UserService.login(username.toLowerCase(), password).then(function (isLoggedIn) {
            if (isLoggedIn) {
                $location.path('/home')
            } else {
                $scope.failedLogin = {message: 'Your username or password was incorrect'};
            }
        })
    };

}]);