angular.module('starter.controllers', ['ngStorage'])

.controller('MainCtrl', function($scope, $http, $state) {
  $scope.shouldHideFooter = function () {
    // hack! descobrir como pegar corretamente o state/rota atual usando stateProvider/state
    if (location.href.split('/')[location.href.split('/').length -1] == "sign_in" ) {
      return true
    }
  }
})

.controller('HomeCtrl', function($scope, $location, $localStorage, User, $state) {
  $scope.user = {}

  $scope.signin = function() {
    var formData = { user: $scope.user }

    User.signin(formData, function(response) {
      User.access_token = response.user.access_token
      User.email = response.user.email

      $state.go('loans')

    }, function() {
      // response.error ?!?!
      $scope.error = 'Falha ao tentar acessar';
    })
  }
})

.controller('LoansCtrl', function($scope, LoanFactory, $timeout, $ionicLoading) {

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

   LoanFactory.getLoans().then(function(response){
      $ionicLoading.hide();
      $scope.loans = response.data
    })
})

.controller('LoanNewCtrl', function($scope, $http, User, $state) {
 $scope.loan = { item: {} };

  $scope.createLoan = function(){
    $http.post('http://localhost:3000/loans.json', { loan: $scope.loan.item, access_token: User.access_token}).then(function(response){
      console.log(response.data);
      $state.go('loans')
    }, function(response){
      console.error(response.data);
    });
  }
})
