angular.module('messanger').controller('singlechat',function($scope,User,$rootScope,$state,$timeout){
      // $scope.seconduser = $rootScope.seconduser;
      console.log('inside single chat', $rootScope.seconduser);

      $scope.singlemessagesend = function(){
          socket.emit('send_single_message',$scope.data.singlemessage)

      }

})
