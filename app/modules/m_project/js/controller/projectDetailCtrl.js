app.controller('projectDetailCtrl', ['$scope', 'StorageConfig', function($scope, StorageConfig){
	$scope.detail = StorageConfig.PROJECT_STORAGE.getItem('detail');
	if($scope.detail.postType == 'want'){
		$scope.detail.floor_low = parseInt($scope.detail.floor.substr(0, $scope.detail.floor.indexOf('-')));
		$scope.detail.floor_high = parseInt($scope.detail.floor.substr($scope.detail.floor.indexOf('-') + 1));
	}
}]);