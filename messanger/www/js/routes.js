//js/routes.js
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
    .state('app.chatroom',{
        url:'/chatroom',
        views:{
          "pageContent":{
            templateUrl:"templates/chatroom.html",
            controller: "chatroom"
          }
        }
    })
    .state('app.activeUsers',{
        url:'/activeUsers',
        views:{
          "pageContent":{
            templateUrl:"templates/activeUsers.html",
            controller: 'activeUsers'
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

    // 
    // .state('app.activeUsers',{
    //     url:'/activeUsers',
    //     views:{
    //       "pageContent":{
    //         templateUrl:"templates/activeUsers.html",
    //         controller: 'activeUsers'
    //       }
    //     }
    // })

    .state('app.singlechat',{
        url :'/singlechat',
        views:{
          "pageContent":{
            templateUrl : "templates/singlechat.html",
            controller :'singlechat'
          }
        }
        })

})
