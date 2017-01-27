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
        if($scope.project == undefined){
            $scope.errorTip = 'this Project must select';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.unit_type == undefined || $scope.unit_type.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Unit Type must select';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.exposure == undefined || $scope.exposure.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Exposure must select';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.selectedType == 'have' && ($scope.floor_level == undefined || $scope.floor_level.replace(/\s+/g, "").replace(/\s+/g, "") == '')){
            $scope.errorTip = 'this Floor Level must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.selectedType == 'want' && ($scope.expect_floor_low == undefined || $scope.expect_floor_low.replace(/\s+/g, "") == '')){
            $scope.errorTip = 'this Floor low must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.selectedType == 'want' && ($scope.expect_floor_high == undefined || $scope.expect_floor_high.replace(/\s+/g, "") == '')){
            $scope.errorTip = 'this Floor high must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.selectedType == 'want' && ($scope.expect_floor_low >= $scope.expect_floor_high)){
            $scope.errorTip = 'this Floor high must greater than Floor low';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.price == undefined || $scope.price.toString().replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Price must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.price > 100000000){
        	$scope.errorTip = 'this Price not more than 8 length';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.coop == undefined || $scope.coop.toString().replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Prefer Coop must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.coop > 100){
        	$scope.errorTip = 'this Prefer Coop not more than 4 length';
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