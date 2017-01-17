app.controller('postingCtrl', ['$scope', 'StorageConfig', 'postService', 'dialog', 'projectService', '$timeout', function($scope, StorageConfig, postService, dialog, projectService, $timeout){
	$scope.selectedTab = 0;
	$scope.checkTab = function(_index){
		$scope.selectedTab = _index;
	}

	$scope.selectedType = 'have';
	getData();
	$scope.checkType = function(_type){
		$scope.selectedType = _type;
	}

	$scope.errorMsg = false;
	$scope.createPost = function(){
		if($scope.project == undefined || $scope.unit_type == undefined || $scope.exposure == undefined || ($scope.selectedType == 'have' && $scope.floor_level == undefined) || ($scope.selectedType == 'want' && $scope.expect_floor_low == undefined) || ($scope.selectedType == 'want' && $scope.expect_floor_high == undefined) || $scope.price == undefined || $scope.coop == undefined){
			$scope.errorMsg = true;
			$timeout(function(){
				$scope.errorMsg = false;
			},2000);
			return false;
		}
		var spinner = dialog.showSpinner();
		var req = {
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			post_type: $scope.selectedType,
			project_id: $scope.project.key,
			project_name: $scope.project.value,
			unit_type: $scope.unit_type,
			exposure: $scope.exposure,
			price: $scope.price,
			coop: $scope.coop,
			floor_level: $scope.floor_level,
			expect_floor_low: $scope.expect_floor_low,
			expect_floor_high: $scope.expect_floor_high,
		}
		postService.userpost(req).then(function(res){
			getWant();
			dialog.closeSpinner(spinner.id);
			$scope.selectedTab = 1;
			//清空表单
			$scope.project = undefined;
			$scope.unit_type = undefined;
			$scope.exposure = undefined;
			$scope.price = undefined;
			$scope.coop = undefined;
			$scope.floor_level = undefined;
			$scope.expect_floor_low = undefined;
			$scope.expect_floor_high = undefined;
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	function getData(){
		var spinner = dialog.showSpinner();
		//select
		postService.selectoptions().then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.results = res.results;
			$scope.results.optionsProject = jsonToArray($scope.results.optionsProject);
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
		//I want
		getWant();
	}

	function getWant(){
		var req = {
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		}
		postService.postlist(req).then(function(res){
			$scope.postList = res.results.postList;
		},function(res){

		});
	}

	function jsonToArray(json){
		var array = new Array();
		for(var key in json){
			array.push({'key': key, 'value': json[key]});
		}
		return array;
	}

	$scope.delet = function(_post){
		dialog.confirm('Delet Post', {
			closeCallback: function(value){
				if(value == 0 ){
				}else{
					var spinner = dialog.showSpinner();
					var req = {
						id: _post.id,
						username: StorageConfig.TOKEN_STORAGE.getItem('username'),
						token: StorageConfig.TOKEN_STORAGE.getItem('token'),
						post_type: _post.postType
					}
					console.log(req);
					postService.deletemypost(req).then(function(res){
						getWant();
						dialog.closeSpinner(spinner.id);
					},function(res){
						dialog.closeSpinner(spinner.id);
						dialog.alert(res.errorMsg);
					});
				}
			}
		});
	}
}]);