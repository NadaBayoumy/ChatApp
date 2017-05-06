angular.module('messanger').controller('chatroom',function($scope,User,$rootScope,$state){

// $scope.message=""

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




// angular.module('messanger').controller('chatroom',function($scope,User,$rootScope,$state,$timeout){
//     // $scope.message='kkkkkkkkkkkkkkkkkkk'
//     // var msg = $scope.message;
//     console.log($scope.message);
//     $scope.send = function(valid){
//           console.log(valid);
//           console.log("message is"+$scope.message);
//           socket.emit('message_from_client',$scope.message);
//           $scope.message ='';
//       }
//
//     //   socket.on('message_from_server',function(msgs){
//     //     $timeout(function(){
//     //         $scope.messages=msgs;
//     //     })
//     // })
//
//     socket.on('get_online_users',function(onlines){
//       $timeout(function(){
//         console.log(onlines);
//           $scope.activeUsers=onlines;
//
//       })
//
//
//     })
//     // $scope.chatUsers=User.chatUsers();
//     // console.log($scope.activeUsers);
// })
