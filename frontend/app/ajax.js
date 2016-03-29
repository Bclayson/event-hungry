angular
	.module('myApp.ajax', [])
    .service('eventfulService', ["$http", function ($http){
        var self = this;
        self.location = undefined;
        self.eventType = undefined;
        
        this.eventSearch = function () {
            var baseUrl = 'http://api.eventful.com/json/events/search/';
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
    }])