app.run(['$rootScope','StorageConfig','$state',function($rootScope,StorageConfig,$state){
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		if(document.getElementById('layoutContent')){
			document.getElementById('layoutContent').scrollTop=0;
		}
		if((toState.name=='layout.login') || (toState.name=='layout.register') || (toState.name=='layout.forgetpwd')) return;
		if(toState.name.indexOf('cck')!=-1) return;
		var username=StorageConfig.TOKEN_STORAGE.getItem('username');
		var token=StorageConfig.TOKEN_STORAGE.getItem('token');
		// if(!(username&&token)){
		// 	event.preventDefault();
		// 	StorageConfig.INTERCEPT_STORAGE.putItem('param',JSON.stringify(toParams));
		// 	$state.go('layout.login',{
		// 		from: toState.name
		// 	})
		// }
	});
}]);