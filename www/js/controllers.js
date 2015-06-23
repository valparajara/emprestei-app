angular.module('starter.controllers', [])

.controller('LoansCtrl', function($scope, LoanFactory) {
   LoanFactory.getLoans().then(function(response){
      $scope.loans = response.data
    })
})

.controller('LoanNewCtrl', function($scope, $http) {
 $scope.loan = { item: {} };

 var token = "ed"

  $scope.createLoan = function(){
    $http.post('http://localhost:3000/loans.json', { loan: $scope.loan.item, access_token: token}).then(function(response){
      console.log(response.data);
    }, function(response){
      console.error(response.data);
    });
  }
})
