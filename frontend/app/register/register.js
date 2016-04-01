var app = angular.module("EventHungry", ['ngRoute']);

app.config(function ($routeProvider) {
            $routeProvider.when('/register', {
                    templateUrl: "register/register.html",
                    controller: "MainController",
                })
                .otherwise({
                    redirectTo: "/",
                })