angular.module('secondApp').factory('Products',function($http,$q,$ionicPopup,$state,$rootScope,$ionicLoading){

    // function checkConnection() {
    //     var networkState = navigator.connection.type;
    //
    //     var states = {};
    //     states[Connection.UNKNOWN]  = 'Unknown connection';
    //     states[Connection.ETHERNET] = 'Ethernet connection';
    //     states[Connection.WIFI]     = 'WiFi connection';
    //     states[Connection.CELL_2G]  = 'Cell 2G connection';
    //     states[Connection.CELL_3G]  = 'Cell 3G connection';
    //     states[Connection.CELL_4G]  = 'Cell 4G connection';
    //     states[Connection.CELL]     = 'Cell generic connection';
    //     states[Connection.NONE]     = 'No network connection';
    //
    //     if(states[networkState] == 'No network connection'){
    //         $ionicLoading.hide()
    //         $ionicPopup.show({
    //             template: '<strong>Warning</strong>',
    //             title: 'check internet connection ',
    //             subTitle: 'something went wrong',
    //             scope: $rootScope,
    //             buttons: [
    //               {
    //                 text: 'OK',
    //                 type: 'button-positive',
    //                 onTap: function() {
    //                   $state.go('home');
    //                 }
    //               }
    //             ]
    //           });
    //     }
    // }

    return {
        activeUsers : function(user){
            // checkConnection();
            var def = $q.defer();
                $http({
                    url:'http://172.16.3.81:3000/api/active_users',
                    method:'GET',
                    data: user
                }).then(function(res){
                    console.log(res.data)
                    def.resolve(res.data)
                },function(err){
                    console.log(err)
                    def.reject(err)
                })
            return def.promise;
        },
        register : function(user){
            // checkConnection();
            var def = $q.defer();
                $http({
                    url:'http://172.16.3.81:3000/api/register',
                    method:'POST',
                    data: user
                }).then(function(res){
                    console.log(res.data)

                    def.resolve(res.data)
                },function(err){
                    console.log(err)
                    def.reject(err)
                })
            return def.promise;
        },
        login : function(user){
            // checkConnection();
            var def = $q.defer();
                $http({
                    url:'http://172.16.3.81:3000/api/login',
                    method:'POST',
                    data: user
                }).then(function(res){
                    console.log(res.data)
                    def.resolve(res.data)
                },function(err){
                    console.log(err)
                    def.reject(err)
                })
            return def.promise;
        },
        getAllProducts : function(){
            checkConnection();
            var def = $q.defer();

                $http({
                    url:'http://test.w34.co/json/',
                    method:'GET'
                }).then(function(res){
                    console.log(res.data)
                    if(res.data.length){
                        def.resolve(res.data)
                    }else{
                        checkConnection();
                        def.reject('there is no data')
                    }
                },function(err){
                    def.reject(err)
                })
            return def.promise;
        },
    }
})
