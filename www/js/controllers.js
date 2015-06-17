angular.module('starter.controllers', [])

.controller('LoansCtrl', function($scope, LoanFactory) {
  $scope.loans = LoanFactory.loans();
})
