// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.headers.post = { 'Content-Type': 'application/json; charset=UTF-8' };
  $httpProvider.defaults.headers.put = { 'Content-Type': 'application/json; charset=UTF-8' };

  $stateProvider
    .state('loans', {
      url: '/loans',
      templateUrl: 'loans.html',
      controller: 'LoansCtrl'
    })

    .state('loan-new', {
      url: '/loan-new',
      templateUrl: 'loan-new.html',
      controller: 'LoanNewCtrl'
    })

  $urlRouterProvider.otherwise('/loans');

})

.run(function ($rootScope){
  $rootScope.endPoint = 'http://localhost:3000'
});
