angular.module('messanger').controller('register',function($scope,User,$rootScope,$state){
    $scope.user={}

    $scope.register = function(valid){
        console.log($scope.user);
        if(valid){
            var result_obj = User.register($scope.user)
            if(result_obj.statues== 1){
                $state.go('activeUser');
            }else {
                //add ionic popup
            }

        }

    }


})
