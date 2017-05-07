angular.module('messanger').controller('activeUsers',function($timeout,$scope,User,$rootScope,$state){
    socket.on('get_online_users',function(onlines){
      console.log('in activeusers controllers');
      $timeout(function(){
        console.log(onlines);
          $scope.activeUsers=onlines;
      })
    // console.log($scope.activeUsers);
})
})
