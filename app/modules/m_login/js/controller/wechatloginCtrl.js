app.controller('wechatloginCtrl', ['$scope', 'CommonService', '$stateParams', '$state', 'StorageConfig', '$interval', '$timeout', function($scope, CommonService, $stateParams, $state, StorageConfig, $interval, $timeout){
	if($stateParams.userid == 'error'){
		$scope.loadingTip = 'WeChat login failed.';
	}else{
		$scope.loadingTip = 'WeChat information, do not operate.';
		$scope.loading = 1;
		$scope.loadingText = '.';
		$interval(function(){
			$scope.loading++;
			if($scope.loading > 3){
				$scope.loading = 1;
			}
			if($scope.loading == 1){
				$scope.loadingText = '.';
			}else if($scope.loading == 2){
				$scope.loadingText = '..';
			}else if($scope.loading == 3){
				$scope.loadingText = '...';
			}
		},500);

		$timeout(function(){
			var req = {
				userid: $stateParams.userid
			}
			CommonService.loginwxuser(req).then(function(res){
				StorageConfig.TOKEN_STORAGE.putItem('username', res.results.userinfo.username);
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
		},2000);
	}
}]);