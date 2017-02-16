app.controller('emailCtrl', ['$scope', 'dialog', '$state', '$stateParams', 'CommonService', '$interval', function($scope, dialog, $state, $stateParams, CommonService, $interval){
	$scope.email = $stateParams.email;
	$scope.showTip = true;
	$scope.send = true;

	$scope.hiddenTip = function(){
		$scope.showTip = false;
	}

	$scope.login = function(){
		$state.go('layout.login');
	}

	$scope.lockEnabled = false;
	$scope.sendText = 'send';
	$scope.sendEmail = function(){
		var req = {
			email: $stateParams.email
		}
		var spinner = dialog.showSpinner();
		CommonService.sendemail(req).then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.lockEnabled = true;
			$scope.send = false;
			$scope.showTip = true;
	        var count = 6;
	        var verifyCodeInterval = setInterval(function () {
	            $scope.sendText = 'resend(' + count-- + 's)';
	            $scope.$apply();
	            if (count == 0) {
	                clearInterval(verifyCodeInterval);
	                $scope.sendText = 'resend';
	                $scope.lockEnabled = false;
	                $scope.$apply();
	            }
	        }, 1000);
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);