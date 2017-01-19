app.controller('loginCtrl',['$scope', 'CommonService', 'dialog', '$stateParams', '$state', 'StorageConfig', '$timeout', '$rootScope', function($scope, CommonService, dialog, $stateParams, $state, StorageConfig, $timeout, $rootScope){
	$scope.goRouter = function(_url){
		$state.go(_url)
	}

	$scope.errorMsg = false;
	$scope.login = function(){
		if($scope.username == undefined || $scope.password == undefined){
			$scope.errorMsg = true;
			$timeout(function(){
				$scope.errorMsg = false;
			},2000);
			return false;
		}
		var spinner = dialog.showSpinner();
		var req = {
			username: $scope.username,
			password: $scope.password
		}
		CommonService.userlogin(req).then(function(res){
			dialog.closeSpinner(spinner.id);
			StorageConfig.TOKEN_STORAGE.putItem('username', $scope.username);
			StorageConfig.TOKEN_STORAGE.putItem('token', res.results.userinfo.token);
			if($stateParams.from == undefined){
				$state.go('layout.project');
			}else{
				$state.go($stateParams.from);
			}
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.wechatLogin = function(){
		var spinner = dialog.showSpinner();
		CommonService.wechatlogin().then(function(res){
			dialog.closeSpinner(spinner.id);
			StorageConfig.TOKEN_STORAGE.putItem('username', $scope.username);
			StorageConfig.TOKEN_STORAGE.putItem('token', res.results.userinfo.token);
			if(res.results.userinfo.isAccount == '1'){
				$state.go('layout.account', {
					id: res.results.userinfo.id,
					accountId: res.results.userinfo.accountId
				});
			}else{
				if($stateParams.from == undefined){
					$state.go('layout.project');
				}else{
					$state.go($stateParams.from);
				}
			}
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);