app.controller('wechatloginCtrl', ['$scope', 'CommonService', '$stateParams', '$state', 'StorageConfig', function($scope, CommonService, $stateParams, $state, StorageConfig){
	var req = {
		userid: $stateParams.userid
	}
	CommonService.loginwxuser(req).then(function(res){
		StorageConfig.TOKEN_STORAGE.putItem('username', res.results.userinfo.token);
		StorageConfig.TOKEN_STORAGE.putItem('token', res.results.userinfo.token);
		if(res.results.userinfo.isAccount == '1'){
			$state.go('layout.account', {
				id: res.results.userinfo.id,
				accountId: res.results.userinfo.accountId
			});
		}else{
			$state.go('layout.project');
		}
	},function(res){
		alert(res.errorMsg);
	});
}]);