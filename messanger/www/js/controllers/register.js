angular.module('messanger').controller('register',function($scope,User,$rootScope,$state){
    $scope.user={}

    $scope.register = function(valid){
        console.log($scope.user);
        if(valid){
            var result_obj = User.register($scope.user)
            if(result_obj.status == 1){
                $state.go('activeUser');
            }else {
                alert('Not valid user');
            }

        }

    }


})
