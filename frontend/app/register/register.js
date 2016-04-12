var app = angular.module("MyApp.register", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: "register/register.html",
        controller: "RegisterController"
    })
}]);

app.controller("RegisterController", ['$scope', 'UserService', '$location', function ($scope, UserService, $location) {

    function hasAllFields(userName, password, email, passwordTwo) {
        return !_.isUndefined(userName) && !_.isUndefined(password) && !_.isUndefined(email) && !_.isUndefined(passwordTwo);
    }

    $scope.createUser = function (userName, password, email, passwordTwo) {
        if (hasAllFields(userName, password, email, passwordTwo)) {
            if (password === passwordTwo) {
                UserService.createUser(userName, password, email).then(function (user) {
                        $location.path('/home');
                }, function (err) {
                    $scope.userNotCreated = {message: "Registration Failed: " + err}
                })
            } else {
                $scope.badPassword = {message: "Your passwords do not match."};
            }
        } else {
            $scope.missingFields = {message: "Please fill out all fields."};
        }
    }
}]);