app.controller('loginCtrl',['$scope', 'CommonService', 'dialog', '$stateParams', '$state', 'StorageConfig', '$timeout', '$rootScope', function($scope, CommonService, dialog, $stateParams, $state, StorageConfig, $timeout, $rootScope){
	var apiUrl = window.envs.api_url;

	$scope.goRouter = function(_url){
		$state.go(_url)
	}

	$scope.errorMsg = false;
	$scope.login = function(){
		if($scope.username == undefined || $scope.username.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Email must input';
			$scope.errorMsg = true;
			$timeout(function(){
				$scope.errorMsg = false;
			},2000);
			return false;
		}
        //验证邮箱格式
        var usernameType = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if(!$scope.username.match(usernameType)){
            $scope.errorTip = 'this email format error';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
		if($scope.password == undefined || $scope.password.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Passowrd must input';
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
			if(res.results.userinfo.verify == 0){
				$state.go('layout.email', {
					email: $scope.username
				});
			}else{
				StorageConfig.TOKEN_STORAGE.putItem('username', $scope.username);
				StorageConfig.TOKEN_STORAGE.putItem('token', res.results.userinfo.token);
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

	$scope.wechatLogin = function(){
		window.location.href = apiUrl + '/xlhapi/wechatuser';

		// var spinner = dialog.showSpinner();
		// CommonService.wechatlogin().then(function(res){
		// 	dialog.closeSpinner(spinner.id);
		// 	StorageConfig.TOKEN_STORAGE.putItem('username', $scope.username);
		// 	StorageConfig.TOKEN_STORAGE.putItem('token', res.results.userinfo.token);
		// 	if(res.results.userinfo.isAccount == '1'){
		// 		$state.go('layout.account', {
		// 			id: res.results.userinfo.id,
		// 			accountId: res.results.userinfo.accountId,
		// 			from: $stateParams.from
		// 		});
		// 	}else{
		// 		if($stateParams.from == undefined){
		// 			$state.go('layout.project');
		// 		}else{
		// 			$state.go($stateParams.from);
		// 		}
		// 	}
		// },function(res){
		// 	dialog.closeSpinner(spinner.id);
		// 	dialog.alert(res.errorMsg);
		// });
	}
}]);