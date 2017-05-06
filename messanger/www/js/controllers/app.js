angular.module('messanger').controller('app',function($scope,User,$rootScope,$state){
    $scope.name = localStorage.getItem('username')
    $scope.logout = function(){
        localStorage.removeItem('username');
        
        $state.go('home')
    }

})
