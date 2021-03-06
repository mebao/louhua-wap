app.controller('userinfoCtrl', ['$scope', 'userService', 'dialog', 'StorageConfig', 'CommonService', '$state', '$rootScope', function($scope, userService, dialog, StorageConfig, CommonService, $state, $rootScope){
	var spinner = dialog.showSpinner();
	var req = {
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token')
	}

	getData(spinner);
	
	function getData(spinner){
		userService.getuserinfo(req).then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.userinfo = res.results.userinfo;
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.unchangeable = function(){
		dialog.toast('Please contact us to modify it.');
	}

	$scope.checkSubscribe = function(){
		$scope.userinfo.subscribe = ($scope.userinfo.subscribe == 'no' ? 'yes' : 'no');
	}

	$scope.updateUser = function(){
		var spinner2 = dialog.showSpinner();
        var updateReq = {
            user_id: $scope.userinfo.user_id,
            username: $scope.userinfo.username,
            wechat_id: $scope.userinfo.wechat_id,
            wechat_name: $scope.userinfo.wechat_name,
            real_name: $scope.userinfo.real_name,
            brokerage_name: $scope.userinfo.brokerage_name,
            cell: $scope.userinfo.cell,
            office_telephone: $scope.userinfo.office_telephone,
            reco_number: $scope.userinfo.reco_number,
            subscribe: $scope.userinfo.subscribe,
        }
        CommonService.useraccount(updateReq).then(function(res){
        	getData(spinner2);
        	dialog.toast('update success');
        },function(res){
            dialog.closeSpinner(spinner2.id);
            dialog.alert(res.errorMsg);
        });
	}

	$scope.logout = function(){
		StorageConfig.TOKEN_STORAGE.removeItem('username');
		StorageConfig.TOKEN_STORAGE.removeItem('token');
		// window.footerConfig = {
		// 	enableCheckType: 0
		// }

		// $rootScope.$broadcast('setFooterConfig', window.footerConfig);
		$state.go('layout.login');
	}
}]);