angular.module('messanger').config(function($stateProvider) {
    $stateProvider
    .state('app',{
        url : '/app',
        templateUrl : "templates/app.html",
        controller: 'app',
        abstract: true
    })
    .state('app.about',{
        url:'/about',
        views:{
          "pageContent":{
            templateUrl:"templates/about.html"
          }
        }
    })
    .state('home',{
        url : '',
        templateUrl : "templates/home.html"
    })
    .state('register',{
        url : '/register',
        templateUrl : "templates/register.html",
        controller: 'register'
    })
    .state('login',{
        url : '/login',
        templateUrl : "templates/login.html",
        controller: 'login'
    })
})
