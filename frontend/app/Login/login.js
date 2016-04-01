var app = angular.module("EventHungry", ['ngRoute']);

app.config(function ($routeProvider) {
            $routeProvider.when('/login', {
                    templateUrl: "login/login.html",
                    controller: "MainController",
                })
                .otherwise({
                    redirectTo: "/",
                })