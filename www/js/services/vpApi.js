angular.module('starter.services', [])

.factory( 'vpApi', ['$http', function($http) {
  
  var user = {username:null,
              token:null,
              profile:null,
              };
  var apiBase = 'http://localhost:8000/api/v2/';

  function login(data, success_callback, error_callback) { 
    /*
    Inputs:
        data : object with keywords username, password
    */
    console.log('I should log in');
    var url = apiBase + 'authenticate/';
    user.username = data.username;
    
    $http.post(url, data)
      .success(function(data, status){
        user.token = data.token;
        success_callback(data, status);
      })
      .error(function(data, status){
        error_callback(data, status)
    });
  }
  
  function logout() {

  }

  function fetch(resource, data, success, fail){
    var url = apiBase + resource + '/';
    $http.get(url, data, function(data, res){
      success(data, res);
    },
    function(data, res){
      fail(data, res);
    });
  }


  return {
      apiBase:apiBase,
      authenticate:login,
      user:user,

      fetch:fetch,
  };
}]);