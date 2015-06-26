angular.module('starter.factories', [])

.factory('LoanFactory', function($http, User) {
  var loans = [];

  return {
    getLoans: function () {
      return $http.get("http://localhost:3000/loans.json?access_token=" + User.access_token)
    }
  }
})

.factory('User', function($http, $localStorage){
  var baseUrl = "http://localhost:3000/";

  return {
    signin: function(user_params, success, error) {
        $http.post(baseUrl + '/sign_in.json', user_params).success(success).error(error)
    }
  };
});
