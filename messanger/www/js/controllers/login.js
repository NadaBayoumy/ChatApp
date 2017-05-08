angular.module('messanger').controller('login', function ($scope, User, $rootScope, $state) {
    $scope.saveduser = {}

    $scope.login = function (valid) {

        console.log($scope.saveduser);
        if (valid) {
            localStorage.setItem('username', $scope.saveduser.username)

            // console.log('**GET INFO OF USER ',$scope.saveduser.username);
            User.getuserinfo($scope.saveduser.username).then(function (res) {
                console.log('inside get user info new api ' , res);
                
            }, function (err) {
            })




            User.login($scope.saveduser).then(function (res) {

                $rootScope.loggedinuser = $scope.saveduser;
                console.log("rootscope of logged in" ,$rootScope.loggedinuser  );
                if (res.status == 1) {
                    socket.open();
                    socket.emit('signin', $scope.saveduser.username, 'online');
                    $state.go('app.activeUsers');
                } else {
                    alert('not valid user')
                }

            }, function (err) {

            })
            // if(result_obj.status== 1){
            //     $state.go('activeUser');
            // }else {
            //   alert('not valid user')
            // }

        }

    }


})
