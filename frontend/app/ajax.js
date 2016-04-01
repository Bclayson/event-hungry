angular
	.module('myApp.ajax', [])

    .config(["$routeProvider", function ($routeProvider){
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

    .service("TokenService", ["$sessionStorage", function ($sessionStorage){
        this.setToken = function (token) {
         $sessionStorage.token = token;   
        }
        
        this.getToken = function () {
            return $sessionStorage.token;
        }
        
        this.removeToken = function () {
            delete $sessionStorage.token;
        }
    }])

    .service('Config', ['TokenService', function (TokenService) {
        var self = this;
        var host = "http://localhost:3000/";
        this.authUrl = host + 'auth/'
        this.eventsUrl = host + 'api/';
        this.config = function () {
            return {
                headers: {
                    Authorization: "Bearer" + tokenService.getToken()
                }
            }
        }
    }])

    .service("UserService", ["$http", "TokenService", 'Config', function ($http, TokenService, Config){
        this.user = undefined;

        this.createUser = function (userName, password, email) {
            var newUser = {username: userName, password: password, email: email}
            $http.post(Config.authUrl + 'signup', newUser).then(function (response){
                TokenService.setToken(response.token);
                this.user = response.user;
                }
            )}
        
        this.login = function (userName, password) {
            var credentials = {username: userName, password: password};
            return $http.post(config.authUrl + "login", credentials).then(function (response){
                TokenService.setToken(response.token);
                this.user = response.user;
                return true
            }, function (err) {
                return false
            })
        }
        
        this.logout = function () {
            TokenService.removeToken();
        }
    }])

    .service('FavoritesService', ["$http", "$q", 'Config', function ($http, $q, Config) {
        var self = this;

        self.addToFavorites = function (event) {
            return $http.post(config.eventsUrl, event, Config.config).then(function (response) {
                return response.data
            })
        }

        self.getFavorites = function () {
            return $http.get(Config.eventsUrl + 'favorites', Config.config).then(function (response) {
                var favoriteEvents = response.data;
                var eventPromises = favoriteEvents.map(function (event) {
                    return eventfulService.getOne(event._id)
                })

                return $q.all(eventPromises).then(function (response) {
                    return response.data
                })
            })
        }
    }])