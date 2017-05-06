//js/routes.js
angular.module('messanger').config(function($stateProvider) {
  $stateProvider

  .state('app',{
    url:'/app',
    templateUrl:"templates/app.html",
    abstract:true,
    // controller:"app"
  })

  // .state('app.home',{
  //   url:'/home',
  //   views:{
  //     "pageContent":{
  //       templateUrl:"templates/home.html"
  //     }
  //   }
  // })

  // .state('app.home',{
  //   url:'/',
  //   templateUrl:"templates/home.html",
  // })


  .state('home',{
    url:"/",
    templateUrl:"templates/home.html",
  })


  .state('login',{
    url:'/login',
    templateUrl:"templates/login.html",
    // controller:"login"
  })




  .state('register',{
    url:'/register',
    templateUrl:"templates/register.html",
    // controller:"signup"
  })



  .state('app.activeusers',{
    url:'/activeusers',
    views:{
      "pageContent":{
        templateUrl:"templates/activeusers.html"
      }
    }
  })





  .state('app.about',{
    url:'/about',
    views:{
      "pageContent":{
        templateUrl:"templates/about.html"
      }
    }
  })

  .state('app.settings',{
    url:'/settings',
    views:{
      "pageContent":{
        templateUrl:"templates/settings.html"
      }
    }
  })

  .state('app.products',{
    url:'/products',
    views:{
      "pageContent":{
        templateUrl:"templates/products.html",
        controller:"products"
      }
    }
  })



   .state('app.product',{
    url:'/product/:product_id',
    views:{
      "pageContent":{
        templateUrl:"templates/product.html",
        controller:"product"
      }
    }
  })



  .state('app.singleproduct',{
    url:'/product/singleproduct',
    views:{
      "pageContent":{
        templateUrl:"templates/singleproduct.html",
        controller:"product"
      }
    }
  })





})
