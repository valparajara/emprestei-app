angular.module('starter.factories', [])

.factory('LoanFactory', function($http) {
  var loans = [];

  return {
    getLoans: function () {
      return $http.get("http://localhost:3000/loans.json?access_token=");
    },
  }
})

.factory('Main', function($http, $localStorage){
    var baseUrl = "http://localhost:3000/";
    function changeUser(user) {
      angular.extend(currentUser, user);
    }

    function getUserFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
          var encoded = token.split('.')[1];
          user = JSON.parse(encoded);
      }
      return user;
    }

    var currentUser = getUserFromToken();

    return {
      signin: function(data, success, error) {
          $http.post(baseUrl + '/sign_in.json', data).success(success).error(error)
      }
    };
  }
);
