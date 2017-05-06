angular.module('messanger').controller('login',function($scope,User,$rootScope,$state){
    $scope.saveduser={}

    $scope.login = function(valid){
        console.log($scope.saveduser);
        if(valid){
            localStorage.setItem('username',$scope.saveduser.username)
            var result_obj = User.login($scope.saveduser)
            if(result_obj.statues== 1){
                $state.go('activeUser');
            }else {
                //add ionic popup
            }

        }

    }


})
