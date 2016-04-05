angular
	.module('myApp.ajax', [])

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

    .service("UserService", ["$http", "TokenService", function ($http, tokenService){
        this.baseUrl = "http://localhost:3000/auth";
        this.user = undefined;
        var config = {
                headers: {
                Authorization: "Bearer" + tokenService.getToken()
                }   
            }
        this.createUser = function (userName, password, email) {
            $http.post(baseUrl + "/signup").then(function (response){
                TokenService.setToken(response.token);
                this.user = response.user;
                }
            )}
        
        this.login = function (userName, password) {
            $http.post(baseUrl + "/login").then(function (response){
                TokenService.setToken(response.token);
                this.user = response.user;
            })
        }
        
        this.logout = function () {
            TokenService.removeToken();
        }
        
    }
])