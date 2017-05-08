/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('messanger').controller('privatechat',function($scope,User,$rootScope,$state,$timeout){
    
    
    
    $scope.data = {
      'message' : ''
    }

    socket.on('private_stored_msgs',function(msgs){
        $timeout(function(){
          // console.log(msgs[0].message);

            $scope.messages=msgs;
            console.log(msgs);
        })
        
    })
    
    // console.log($scope.data.message);
    $scope.send = function(valid){
          // console.log(valid);
          console.log("message is "+$scope.data.message);
          console.log('loged user is',$rootScope.loggedinuser.username);
          socket.emit('message_from_client_private',$scope.data.message , $rootScope.loggedinuser.username);
          $scope.data.message ='';
          $state.go('app.privatechat')
      }

      
//
//    socket.on('get_online_users',function(onlines){
//      $timeout(function(){
//        console.log("here iam in inl users",onlines);
//          $scope.activeUsers=onlines;
//      })


//    })




    // $scope.chatUsers=User.chatUsers();
    // console.log($scope.activeUsers);
})
