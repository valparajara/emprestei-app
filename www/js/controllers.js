angular.module('starter.controllers', ['ngStorage'])

.controller('HomeCtrl', function($scope, $location, $localStorage, Main) {
  $scope.user = {}

  $scope.signin = function() {
    var formData = { user: $scope.user }

    Main.signin(formData, function(response) {
      if (response.type == false) {
        alert(response.data)
      } else {
        $localStorage.token = response.data.token;
        window.location = "/";
      }
    }, function() {
      // response.error ?!?!
      $scope.error = 'Falha ao tentar acessar';
    })
  };

  $scope.token = $localStorage.token;
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

.controller('LoanNewCtrl', function($scope, $http) {
 $scope.loan = { item: {} };

 var token = ""

  $scope.createLoan = function(){
    $http.post('http://localhost:3000/loans.json', { loan: $scope.loan.item, access_token: token}).then(function(response){
      console.log(response.data);
    }, function(response){
      console.error(response.data);
    });
  }
})
