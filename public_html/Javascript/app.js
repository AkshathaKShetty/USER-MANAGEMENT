var app = angular.module("app", ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
         .state('Login', {
             url: '/Login',
             templateUrl: 'Login.html',
             controller: 'loginctrl'
         })
         .state('User', {
             url: '/User',
             templateUrl: 'UserDetails.html',
             controller: 'loginctrl'
         }).state('LogOut', {
             url: '/LogOut',
             templateUrl: 'LogOut.html',
             controller: 'loginctrl'
         });
    $urlRouterProvider.otherwise('/Home');
}]);
