angular.module('starter.factories', [])

.constant('BaseApiUrl', "http://emprestei-api.herokuapp.com/")

.service('Loans', function($http, User, BaseApiUrl) {

  var Loans = {
    initialize: function () {
      return $http.get(BaseApiUrl + "/loans.json", { params: { access_token: User.access_token } })
                  .success(function (data) {
                    Loans.collection = data
                  })
    },

    add: function (item) {
      return $http.post(BaseApiUrl + "/loans.json", { loan: item, access_token: User.access_token})
                  .success(function(data) {
                    Loans.collection.splice(0, 0, data.loan)
                  })
                  .error(function(response){
                    console.error(response.data);
                  })
    },

    getLoans: function () {
      return $http.get(BaseApiUrl + "/loans.json", { params: { access_token: User.access_token } })
    }
  }

  return Loans
})

.service('User', function($http, $localStorage, BaseApiUrl){
  return {
    signin: function(user_params, success, error) {
        $http.post(BaseApiUrl + '/sign_in.json', user_params).success(success).error(error)
    }
  };
});
