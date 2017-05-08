angular.module('messanger').controller('register',function($scope,User,$rootScope,$state){
    $scope.user={}

    $scope.register = function(valid){
        console.log($scope.user);
        if(valid){
            User.register($scope.user).then(function(res) {

            if(res.status == 1){
                User.login($scope.user).then(function (res) {

                    $rootScope.loggedinuser = $scope.user;
                    console.log("rootscope of logged in" ,$rootScope.loggedinuser  );
                    if (res.status == 1) {
                        socket.open();
                        socket.emit('signin', $scope.user.username, 'online');
                        $state.go('app.activeUsers');
                    } else {
                        alert('not valid user')
                    }

                }, function (err) {

                })
                // $state.go('app.activeUsers');
            }else{
              alert('not valid user')
            }

            },function(err){

            })
            // console.log(result_obj)
            // if(result_obj.status == 1){
            //     $state.go('app.activeUsers');
            // }else {
            //     alert('cannot save user');
            // }

        }

    }


})
