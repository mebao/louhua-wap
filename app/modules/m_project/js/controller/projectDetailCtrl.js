app.controller('projectDetailCtrl', ['$scope', 'StorageConfig', 'projectService', 'dialog', '$timeout', function($scope, StorageConfig, projectService, dialog, $timeout){
	$scope.detail = StorageConfig.PROJECT_STORAGE.getItem('detail');
	if($scope.detail.postType == 'want'){
		$scope.detail.floor_low = parseInt($scope.detail.floor.substr(0, $scope.detail.floor.indexOf('-')));
		$scope.detail.floor_high = parseInt($scope.detail.floor.substr($scope.detail.floor.indexOf('-') + 1));
	}

	$scope.match = function(_post, _type){
		var spinner = dialog.showSpinner();
		var params = {
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			id: _post.id,
			post_type: _type
		}
		projectService.userwatch(params).then(function(res){
			dialog.closeSpinner(spinner.id);
			if(res.results.msg == 'ok'){
				$scope.matchTip = 'Your match request has been submitted successful. Our agent will contact with you shortly.';
			}else{
				$scope.matchTip = 'Your match request has been submitted successful. You are on the waiting list. Our agent will contact with you shortly.';
			}
			$scope.detail.canMatch = 0;
			StorageConfig.PROJECT_STORAGE.putItem('detail', $scope.detail);
			$scope.matchOk = true;
			$timeout(function(){
				$scope.matchOk = false;
			},2000);
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);