app.factory('HttpSetProvider', ['$http', 'SystemConfig', 'StorageConfig', function ($http, SystemConfig, StorageConfig) {
    return {
        setCommonAuthorization: function (value) {
            if(value){
                $http.defaults.headers.common['Authorization'] = value;
                StorageConfig.TOKEN_STORAGE.putItem('authorization', value);
            }else{
                $http.defaults.headers.common['Authorization'] = StorageConfig.TOKEN_STORAGE.getItem('authorization');
            }
        },
        getCommonAuthorization: function(){
            return $http.defaults.headers.common['Authorization'];
        },
        removeCommonAuthorization: function () {
            $http.defaults.headers.common['Authorization'] = '';
        },
        reSetCommonAuthorization: function(value){
            if(value){
                $http.defaults.headers.common['Authorization'] = value;
                StorageConfig.TOKEN_STORAGE.putItem('authorization', value)
            }else{
                $http.defaults.headers.common['Authorization'] = '';
                StorageConfig.TOKEN_STORAGE.putItem('authorization', '')
            }
        }
    }
}]);