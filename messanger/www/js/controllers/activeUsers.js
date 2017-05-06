angular.module('messanger').controller('activeUsers',function($scope,User,$rootScope,$state){
    $scope.activeUsers=User.activeUsers();
    console.log($scope.activeUsers);
})
