app.controller('projectCtrl', ['$scope', 'projectService', 'dialog', 'StorageConfig', '$state', '$stateParams', '$timeout', function($scope, projectService, dialog, StorageConfig, $state, $stateParams, $timeout){
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
		var req = {
			projectid: $stateParams.projectId == undefined ? '' : $stateParams.projectId
		}
		projectService.project(req).then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.project = res.results.project;
			$scope.postList = res.results.postList;
			StorageConfig.TOKEN_STORAGE.putItem('projectName', res.results.project.name);
			StorageConfig.TOKEN_STORAGE.putItem('projectId', res.results.project.id);
			document.title = res.results.project.name;
			if(username_storage && token_storage){
				var req = {
					username: username_storage,
					token: token_storage,
					project_id: StorageConfig.TOKEN_STORAGE.getItem('projectId') == undefined ? '' : StorageConfig.TOKEN_STORAGE.getItem('projectId')
				}
				projectService.orderwantlist(req).then(function(res){
					$scope.wantList = res.results.postList;
				},function(res){});
			}
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
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

	$scope.checkPostItem = function(_id){
		$scope.selectedPostItem = _id;
	}

	$scope.checkWantItem = function(_id){
		$scope.selectedWantItem = _id;
	}

	$scope.match = function(_id, _type){
		if(username_storage && token_storage){
			var spinner = dialog.showSpinner();
			var params = {
				username: StorageConfig.TOKEN_STORAGE.getItem('username'),
				token: StorageConfig.TOKEN_STORAGE.getItem('token'),
				id: _id,
				post_type: _type
			}
			projectService.userwatch(params).then(function(res){
				$scope.selectedPostItem = 0;
				$scope.selectedWantItem = 0;
				dialog.closeSpinner(spinner.id);
				if(res.results.msg == 'ok'){
					$scope.matchTip = 'Your match request has been submitted successful. Our agent will contact with you shortly.';
				}else{
					$scope.matchTip = 'Your match request has been submitted successful. You are on the waiting list. Our agent will contact with you shortly.';
				}
				$scope.matchOk = true;
				$timeout(function(){
					$scope.matchOk = false;
				},2000);
			},function(res){
				$scope.selectedPostItem = 0;
				$scope.selectedWantItem = 0;
				dialog.closeSpinner(spinner.id);
				dialog.alert(res.errorMsg);
			});
		}else{
			dialog.alert('Please login first.', {
				closeCallback: function(value){
					if(value == 0 ){
					}else{
						$state.go('layout.login');
					}
				}
			});
		}
	}

	$scope.detail = function(_detail){
		if(username_storage && token_storage){
			StorageConfig.PROJECT_STORAGE.putItem('detail', _detail);
			$state.go('layout.projectDetail');
		}else{
			dialog.alert('Please login first.', {
				closeCallback: function(value){
					if(value == 0 ){
					}else{
						$state.go('layout.login');
					}
				}
			});
		}
	}
}]);