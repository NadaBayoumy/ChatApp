angular.module('messanger').controller('activeUsers',function($timeout,$scope,User,$rootScope,$state){
    
     $scope.private =function(reciver){
//         console.log(reciver);
         socket.emit('reciver',reciver);
         $state.go('app.privatechat');
     }
     
     
    socket.on('get_online_users',function(onlines){
      console.log('in activeusers controllers');
//      console.log(onlines);
      $timeout(function(){
        console.log(onlines);
          $scope.activeUsers=onlines;
      })
    // console.log($scope.activeUsers);
})
   
})
