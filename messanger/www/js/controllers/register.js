angular.module('messanger').controller('register',function($scope,User,$rootScope,$state){
    $scope.user={}

    $scope.register = function(valid){
        console.log($scope.user);
        if(valid){
            User.register($scope.user).then(function(res) {

            if(res.status == 1){
                $state.go('app.activeUsers');
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
