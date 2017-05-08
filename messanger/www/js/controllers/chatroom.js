angular.module('messanger').controller('chatroom', function ($scope, User, $rootScope, $state, $timeout) {
    $scope.data = {
        'message': ''
    }
    socket.emit('enter_chat_room');

    // console.log($scope.data.message);
    $scope.send = function (valid) {
        // console.log(valid);
        console.log("message is " + $scope.data.message);
        console.log('loged user is', $rootScope.loggedinuser.username);
        socket.emit('message_from_client', $scope.data.message, $rootScope.loggedinuser.username);
        $scope.data.message = '';
    }

    socket.on('messages_from_server', function (msgs) {
        $timeout(function () {
            // console.log(msgs[0].message);

            $scope.messages = msgs;
        })
    })
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
