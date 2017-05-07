angular.module('messanger').controller('activeUsers',function($timeout,$scope,User,$rootScope,$state){

    $scope.chatsingle = function(online) {
      $rootScope.seconduser = online;
      $state.go('app.singlechat');
    }
    socket.on('get_online_users',function(onlines){
      console.log('in activeusers controllers');
      $timeout(function(){
        console.log("watch the full object ",onlines);
          $scope.activeUsers=onlines;
      })
    // console.log($scope.activeUsers);
    })




        socket.on('logged_in_user',function(loggedinuser){
          console.log('in loged in user activeusers controllers');
          $timeout(function(){
              console.log("inside loogged in emiitgjgjdjf",loggedinuser);
              $rootScope.loggedinuser=loggedinuser;
          })
        })



})
