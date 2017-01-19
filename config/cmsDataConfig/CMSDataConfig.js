app.factory('CMSDataConfig', ['StorageConfig', '$state', 'dialog', function (StorageConfig, $state, dialog) {
    var data = {};
    data.appMenus = [
        {
            text: 'Project',
            route: 'layout.project',
            url: '/layout/project'
        },
        {
            text: 'Post',
            route: 'layout.posting',
            url: '/layout/posting',
            beforeCall: function(){
                if(!(StorageConfig.TOKEN_STORAGE.getItem('username') && StorageConfig.TOKEN_STORAGE.getItem('username'))){
                    $state.go('layout.login', {
                        from: 'layout.posting'
                    });
                    return false;
                }
                return true;
            }
        },
        {
            text: 'Log In',
            route: 'layout.login',
            url: '/layout/login'
        }
    ];
    data.loginMenus = [
        {
            text: 'Project',
            route: 'layout.project',
            url: '/layout/project'
        },
        {
            text: 'Post',
            route: 'layout.posting',
            url: '/layout/posting',
            beforeCall: function(){
                if(!(StorageConfig.TOKEN_STORAGE.getItem('username') && StorageConfig.TOKEN_STORAGE.getItem('username'))){
                    $state.go('layout.login', {
                        from: 'layout.posting'
                    });
                    return false;
                }
                return true;
            }
        },
        {
            text: '',
            class: 'icon-user',
            route: 'layout.login',
            url: '/layout/login',
            beforeCall: function(){
                dialog.confirm('log out', {
                    closeCallback: function(value){
                        if(value == 0 ){
                        }else{
                            StorageConfig.TOKEN_STORAGE.removeItem('username');
                            StorageConfig.TOKEN_STORAGE.removeItem('token');
                            $state.go('layout.login', {
                                from: 'layout.posting'
                            });
                        }
                    }
                });
                return false;
            }
        }
    ];
    return data;
}]);