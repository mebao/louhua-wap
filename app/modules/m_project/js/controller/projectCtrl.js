app.controller('projectCtrl', ['$scope', 'projectService', 'dialog', 'StorageConfig', '$state', function($scope, projectService, dialog, StorageConfig, $state){
	var username_storage = StorageConfig.TOKEN_STORAGE.getItem('username');
	var token_storage = StorageConfig.TOKEN_STORAGE.getItem('token');
	var tab_storage = StorageConfig.PROJECT_STORAGE.getItem('tab');
	if(tab_storage && username_storage && token_storage){
		$scope.selectedTab = tab_storage;
	}else{
		$scope.selectedTab = 0;
	}

	$scope.checkTab = function(_index){
		if((_index == 0) || (username_storage && token_storage)){
			$scope.selectedTab = _index;
			StorageConfig.PROJECT_STORAGE.putItem('tab', 0);
		}else{
			StorageConfig.PROJECT_STORAGE.putItem('tab', 1);
			$state.go('layout.login', {
				from: 'layout.project'
			});
		}
	}

	getData();

	function getData(){
		var spinner = dialog.showSpinner();
		projectService.project().then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.project = res.results.project;
			$scope.postList = res.results.postList;
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
		if(username_storage && token_storage){
			var req = {
				username: username_storage,
				token: token_storage,
			}
			projectService.orderwantlist(req).then(function(res){
				$scope.wantList = res.results.postList;
			},function(res){});
		}
	}

	$scope.all = function(){
		//存储进入projectlist的路径
		StorageConfig.PROJECT_STORAGE.putItem('listTab', $scope.selectedTab);
		if(username_storage && token_storage){
			$state.go('layout.projectList');
		}else{
			$state.go('layout.login', {
				from: 'layout.projectList'
			});
		}
	}
}]);