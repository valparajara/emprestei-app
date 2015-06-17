angular.module('starter.factories', [])

.factory('LoanFactory', function($http) {
  var loans = [];

  return {
    getLoans: function () {
      return $http.get("http://localhost:3000/loans.json?access_token=4f");
    },

  }
})
