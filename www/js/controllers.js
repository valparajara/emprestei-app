angular.module('starter.controllers', [])

.controller('LoansCtrl', function($scope, LoanFactory) {
   LoanFactory.getLoans().then(function(response){
      $scope.loans = response.data
    })
})
