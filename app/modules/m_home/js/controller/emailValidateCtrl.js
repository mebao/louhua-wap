app.controller('emailValidateCtrl', ['$scope', '$rootScope', '$stateParams', function($scope, $rootScope, $stateParams){
	window.footerConfig = {
		enableFooter: false
	}

	$rootScope.$broadcast('setFooterConfig', window.footerConfig);

	$scope.showTip = '';
	if($stateParams.status == 'ok'){
		$scope.showTip = 'verify success';
	}else{
		if($stateParams.error == 'null'){
			$scope.showTip = 'verify link error';
		}else if($stateParams.error == 'expired'){
			$scope.showTip = 'verify link expired';
		}else if($stateParams.error == 'used'){
			$scope.showTip = 'verify link has been used';
		}
	}
}]);