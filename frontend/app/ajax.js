angular
	.module('myApp.ajax', [])

    .service('EventfulService', ["$http", function ($http){

        var self = this;

        self.location = "provo";
        self.eventType = "concerts";
        var host = 'http://api.eventful.com';
        var search =  host + '/json/events/search/';
        var getOne = host + '/json/events/get'
        var app_key = 'tbjF24MDLBS5gMFJ';

        this.eventSearch = function () {
            
            return $http.get(search, {
                params: {
                  app_key: app_key,
                  q: self.eventType,
                  l: self.location
                }
              })
              .then(function(res) {
                return res.data;
              })    
        }

        this.getOne = function (id) {
           return $http.get(getOne, {
                params: {
                    app_key: app_key,
                    id: id
                }
            }).then(function (response){
                return response.data
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
        this.eventsUrl = host + 'api/event/';
        this.config = function () {
            return {
                headers: {
                    'Authorization': "Bearer " + TokenService.getToken()
                }
            }
        }
    }])

    .service("UserService", ["$http", "TokenService", 'Config', function ($http, TokenService, Config){
        this.user = undefined;

        this.createUser = function (userName, password, email) {
            var newUser = {username: userName, password: password, email: email}
            return $http.post(Config.authUrl + 'signup', newUser).then(function (response){
                TokenService.setToken(response.data.token);
                this.user = response.user;
                return response;
                }
            )}
        
        this.login = function (userName, password) {
            var credentials = {username: userName, password: password};

            return $http.post(Config.authUrl + "login", credentials).then(function (response){
                TokenService.setToken(response.data.token);
                this.user = response.user;
                return true
            }, function (err) {
                console.log('error')
                return false
            })
        }
        
        this.logout = function () {
            TokenService.removeToken();
        }
        
        this.isLoggedIn = function () {
            return !_.isUndefined(TokenService.getToken())
        }
        
    }])

    .service('FavoritesService', ["$http", "$q", 'Config', 'EventfulService', function ($http, $q, Config, EventfulService) {
        var self = this;

        self.addToFavorites = function (event) {
            return $http.post(Config.eventsUrl + 'favorites', event, Config.config()).then(function (response) {
                return response.data
            })
        }

        self.getFavoritesReferences = function () {
            return $http.get(Config.eventsUrl + 'favorites', Config.config()).then(function (response) {
                return response.data
            })
        }

        self.getFavorites = function () {
            return self.getFavoritesReferences().then(function (favoriteEvents ) {
                var eventPromises = favoriteEvents.map(function (event) {
                    return EventfulService.getOne(event._id)
                })

                return $q.all(eventPromises).then(function (favoriteEvents) {
                    return favoriteEvents

                })
            })
        }
        
        self.removeFromFavorites = function (id) {
            return $http.delete(Config.eventsUrl + 'favorites/' + id, Config.config()).then(function (response) {
                return response;
            })
        }
    }])