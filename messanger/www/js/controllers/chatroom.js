angular.module('messanger').controller('chatroom',function($scope,User,$rootScope,$state){
    $scope.send = function(){
        console.log($scope.message);
        socket.emit('message_from_client',$scope.message);
        $scope.message ='';
      }
      socket.on('message_from_server',function(msgs){
        $timeout(function(){
            $scope.messages=msgs;
        })
    })

    socket.on('names_from_server',function(onlines){
      $timeout(function(){
          $scope.activeUsers=onlines;
      })

    })
    // $scope.chatUsers=User.chatUsers();
    // console.log($scope.activeUsers);
})
