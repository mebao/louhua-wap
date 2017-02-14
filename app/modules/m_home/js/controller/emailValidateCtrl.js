app.controller('emailValidateCtrl', ['$scope', '$rootScope', '$stateParams', function($scope, $rootScope, $stateParams){
	window.footerConfig = {
		enableFooter: false
	}

	$rootScope.$broadcast('setFooterConfig', window.footerConfig);

	$scope.showTip = '';
	if($stateParams.status == 'ok'){
		$scope.showTip = '验证成功';
	}else{
		if($stateParams.error == 'null'){
			$scope.showTip = '验证链接错误';
		}else if($stateParams.error == 'expired'){
			$scope.showTip = '验证链接过期';
		}else if($stateParams.error == 'used'){
			$scope.showTip = '验证链接已被使用';
		}
	}
}]);