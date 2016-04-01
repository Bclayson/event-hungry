var app = angular.module("MyApp.login", ['ngRoute']);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: "login/login.html",
        controller: "LoginController"
    })
}]);

app.controller("LoginController", ['$scope', function ($scope) {

}]);