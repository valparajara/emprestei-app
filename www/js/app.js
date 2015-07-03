// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories', 'ngStorage',
    'ngRoute'])

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

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $routeProvider) {

  $httpProvider.interceptors.push(function($q, $location, $localStorage) {
    return {
      'request': function (config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'params ' + $localStorage.token;
        }
        return config;
      },
      'responseError': function(response) {
        if(response.status === 401 || response.status === 403) {
          $location.path('/sign_in');
        }
        return $q.reject(response);
      }
    };
  });

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'signin.html',
      controller: 'HomeCtrl'
    })

    .state('signin', {
      url: '/sign_in',
      templateUrl: 'signin.html',
      controller: 'HomeCtrl'
    })

    .state('user-new', {
      url: '/user-new',
      templateUrl: 'user-new.html',
      controller: 'UserNewCtrl'
    })

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

    .state('loan-edit', {
      url: '/loan-edit/:loan_id',
      templateUrl: 'loan-edit.html',
      controller: 'LoanEditCtrl'
    })

  $urlRouterProvider.otherwise('/sign_in');
})
