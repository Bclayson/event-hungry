var app = angular.module("MyApp.register", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: "register/register.html",
        controller: "RegisterController"
    })
}]);

app.controller("RegisterController", ['$scope', function ($scope) {

}]);