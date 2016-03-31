angular
	.module('myApp.ajax', [])

    .config(["$routeProvier", function ($routeProvider){
        $routeProvider
        .when('/favorites', {
            templateUrl: "favorite.html",
            controller: "FavCtrl",
            resolve: {
                loggedIn: function () {
                    
                }
            }
        })
    }])

    .service('eventfulService', ["$http", function ($http){
        var self = this;
        self.location = "provo";
        self.eventType = "concerts";
        var baseUrl = 'http://api.eventful.com/json/events/search/';
        
        this.eventSearch = function () {
            
            return $http.get(baseUrl, {
                params: {
                  app_key: 'tbjF24MDLBS5gMFJ',
                  q: self.eventType,
                  l: self.location
                }
              })
              .then(function(res) {
                console.log(res.data);
                return res.data;
              })    
        }
        this.getOne = function (id) {
           return $http.get(baseUrl, {
                params: {
                    app_key: 'tbjF24MDLBS5gMFJ',
                    id: id
                }
            }).then(function (response){
                return console.log(response.data)
            })
        }
    }])
    .service("eventStorageService", ["$http","$sessionStorage", function ($http, $sessionStorage){
        this.baseUrl = "http://localhost:3000/auth"
        var config = {
                headers: {
                Authorization: "Bearer" + $sessionStorage.token
                }   
            }
        this.createUser = function (userName, password, email) {
            $http.post(baseUrl + "/signup").then(function (response){
                $sessionStorage.token = response.token;
                }
            )}
        }
])