angular.module('starter.factories', [])

// .constant('BaseApiUrl', "http://emprestei-api.herokuapp.com/")
.constant('BaseApiUrl', "http://localhost:3000/")

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

    getLoan: function (id) {
      return $http.get(BaseApiUrl + "/loans/" + id + ".json", { params: { access_token: User.access_token } })
    },

    editLoan: function (loan) {

      return $http.put(BaseApiUrl + "/loans/" + loan.id + ".json", { loan: loan, access_token: User.access_token})
                  .success(function (data) {
                    console.log("entrou aqui")
                      console.log(loan.id)
                      console.log(Loans.collection)

                    for (i = 0; i < Loans.collection.length; i ++){
                      if (Loans.collection[i].id == loan.id){
                        Loans.collection.splice(i, 1, data.loan)
                      }
                    }
                  })
                  .error(function(response){
                    console.error(response.data);
                  })
    }
  }

  return Loans
})

.service('User', function($http, $localStorage, BaseApiUrl, $state){

  var User = {

    signin: function(user_params, success, error) {
      return $http.post(BaseApiUrl + '/sign_in.json', user_params).success(success).error(error)
    },

    createUser: function (item) {
      return $http.post(BaseApiUrl + "/user.json", { user: item} )
    }
  }
  return User

});
