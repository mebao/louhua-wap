app.run(['$rootScope','StorageConfig','$state',function($rootScope,StorageConfig,$state){
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		if(document.getElementById('layoutContent')){
			document.getElementById('layoutContent').scrollTop=0;
		}

		//登录后，直接进入project
		var username=StorageConfig.TOKEN_STORAGE.getItem('username');
		var token=StorageConfig.TOKEN_STORAGE.getItem('token');
		if((toState.name=='layout.login') && (username&&token)){
			$state.go('layout.project');
		}

		if((toState.name=='layout.login') || (toState.name=='layout.register') || (toState.name=='layout.forgetpwd')) return;
		//need intercept
		var urlList = [
			'project',
			'projectList',
			'posting',
			'userinfo',
			'editPost',
		];

		var intercept = false;
        angular.forEach(urlList, function(url, index, array){
            if(toState.name.indexOf(url) != -1){
                intercept = true;
            }
        });

        if(intercept){
        	if(toState.name.indexOf('cck')!=-1) return;
			if(!(username&&token)){
				event.preventDefault();
				StorageConfig.INTERCEPT_STORAGE.putItem('param',JSON.stringify(toParams));
				$state.go('layout.login',{
					from: toState.name
				})
			}
        }
	});
}]);