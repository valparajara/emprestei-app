angular.module('starter.controllers', ['ngStorage'])

.controller('MainCtrl', function($scope, $http, $state) {

  $scope.shouldHideFooter = function () {
    // hack! descobrir como pegar corretamente o state/rota atual usando stateProvider/state
    if (location.href.split('/')[location.href.split('/').length -1] == "sign_in"
      || location.href.split('/')[location.href.split('/').length -1] == "user-new"
      || location.href.split('/')[location.href.split('/').length -1] == "logout"  ) {
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
      $scope.error = 'Falha ao tentar acessar. Verifique seu email e senha.';
    })
  }
})

.controller('LoansCtrl', function($scope, Loans, $timeout, $ionicLoading, User, $state) {

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  Loans.initialize().then(function () {
    $ionicLoading.hide()
  })

  $scope.loans = Loans

  $scope.setReturned = function(id){
    Loans.setReturned(id).success(function(loan){
      $state.go('loans')
    })
  }
})

.controller('LoanNewCtrl', function($scope, $http, User, Loans, $state) {
 $scope.loan = { item: {} };

  $scope.createLoan = function(){
    Loans.add($scope.loan.item).success(function () {

      $state.go('loans')
    })
  }
})

.controller('UserNewCtrl', function($scope, $http, User, Loans, $state) {

  $scope.user = { item: {} };

  $scope.createUser = function(){
    User.createUser($scope.user.item).success(function (response) {

    User.access_token = response.user.access_token
    User.email = response.user.email

    $state.go('loans')
    })
  }
})

.controller('LoanEditCtrl', function($scope, $http, User, Loans, $state, $stateParams) {

  Loans.getLoan($stateParams.loan_id, true).then(function(loan) {
    $scope.loan = angular.copy(loan)
  })

  $scope.editLoan = function(){
    Loans.editLoan($scope.loan).success(function(loan){

      $state.go('loans')
    })
  }
})
