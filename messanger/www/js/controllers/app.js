angular.module('messanger').controller('app',function($scope,User,$rootScope,$state,$timeout){
    $scope.name = localStorage.getItem('username');
    User.getuserinfo($scope.name).then(function(res){
    	$timeout(function(){
    	$scope.user = res.message;
      switch(res.message[0].firstname) {
    case "Mohamed":
        $scope.profile_pic = "img/shehata.jpg"
        break;
    case "Mina":
        $scope.profile_pic = "img/mina.jpg"
        break;
    case "Nada":
        $scope.profile_pic = "img/nada.jpg"
        break;
    case "Simona":
        $scope.profile_pic = "img/simona.jpg"
        break;
    default:
    $scope.profile_pic = "img/ionic.png"
  };
    })
    },function(err){});


    $scope.logout = function(){
    	socket.disconnect();
        localStorage.removeItem('username');

        $state.go('home')
    }


    $scope.toggle_state= function(){
        socket.emit('toggle_state');
    }

})
