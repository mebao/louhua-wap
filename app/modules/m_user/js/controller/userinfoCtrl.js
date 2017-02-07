app.controller('userinfoCtrl', ['$scope', 'userService', 'dialog', 'StorageConfig', 'CommonService', function($scope, userService, dialog, StorageConfig, CommonService){
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

	$scope.checkSubscribe = function(){
		$scope.userinfo.subscribe = ($scope.userinfo.subscribe == 'no' ? 'yes' : 'no');
	}

	$scope.updateUser = function(){
		var spinner2 = dialog.showSpinner();
        var updateReq = {
            user_id: $scope.userinfo.user_id,
            wechat_id: $scope.userinfo.wechat_id,
            real_name: $scope.userinfo.real_name,
            brokerage_name: $scope.userinfo.brokerage_name,
            cell: $scope.userinfo.cell,
            office_telephone: $scope.userinfo.office_telephone,
            reco_number: $scope.userinfo.reco_number,
            subscribe: $scope.userinfo.subscribe,
        }
        CommonService.useraccount(updateReq).then(function(res){
        	getData(spinner2);
        },function(res){
            dialog.closeSpinner(spinner2.id);
            dialog.alert(res.errorMsg);
        });
	}
}]);