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
                console.log(res.data);
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
//        $sessionStorage.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImFkbWluIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImFkbWluIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiYWRtaW4iOmZhbHNlLCJfX3YiOjAsInBhc3N3b3JkIjoiSm9obldheW5lIiwidXNlcm5hbWUiOiJ0aGVzaG9vdGlzdCIsIl9pZCI6IjU2ZmIwMDgxYWViY2M2NGQyZGUwYWRmNiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ1OTQ3NTMxMSwiZXhwIjoxNDU5NTYxNzExfQ.F6u4FFQf8fDQfLPSJzx1KkrqB6uEkr6QSSkQchIuZac"

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
            $http.post(Config.authUrl + 'signup', newUser).then(function (response){
                TokenService.setToken(response.token);
                this.user = response.user;
                }
            )}
        
        this.login = function (userName, password) {
            var credentials = {username: userName, password: password};

            return $http.post(Config.authUrl + "login", credentials).then(function (response){
                TokenService.setToken(response.data.token);
                console.log(response)

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
    }])

    .service('FavoritesService', ["$http", "$q", 'Config', 'EventfulService', function ($http, $q, Config, EventfulService) {
        var self = this;

        self.addToFavorites = function (event) {
            return $http.post(Config.eventsUrl, event, Config.config()).then(function (response) {
                return response.data
            })
        }

        self.getFavorites = function () {
            return $http.get(Config.eventsUrl + 'favorites', Config.config()).then(function (response) {
                var favoriteEvents = response.data;
                var eventPromises = favoriteEvents.map(function (event) {
                    return EventfulService.getOne(event._id)
                })

                return $q.all(eventPromises).then(function (favoriteEvents) {
                    return favoriteEvents
                })
            })
        }
    }])