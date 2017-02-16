app.controller('editPostCtrl', ['$scope', 'StorageConfig', 'postService', 'dialog', '$timeout', function($scope, StorageConfig, postService, dialog, $timeout){
	//获取筛选条件
	var spinner = dialog.showSpinner();
	postService.selectoptions().then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.results = res.results;
		$scope.results.optionsProject = jsonToArray($scope.results.optionsProject);
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	$scope.post = StorageConfig.POST_STORAGE.getItem('post');
	$scope.post.price = parseInt($scope.post.price);
	$scope.post.coop = parseInt($scope.post.coop);
	if($scope.post.postType == 'want'){
		$scope.post.floor_low = parseInt($scope.post.floor.substr(0, $scope.post.floor.indexOf('-')));
		$scope.post.floor_high = parseInt($scope.post.floor.substr($scope.post.floor.indexOf('-') + 1));
	}

    $scope.errorMsg = false;
	$scope.update = function(){
		if($scope.post.postType == 'have' && ($scope.post.floor == undefined || $scope.post.floor.replace(/\s+/g, "").replace(/\s+/g, "") == '')){
            $scope.errorTip = 'this Floor Level must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.post.postType == 'want' && ($scope.post.floor_low == undefined || $scope.post.floor_low.toString().replace(/\s+/g, "") == '')){
            $scope.errorTip = 'this Floor low must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.post.postType == 'want' && ($scope.post.floor_high == undefined || $scope.post.floor_high.toString().replace(/\s+/g, "") == '')){
            $scope.errorTip = 'this Floor high must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.post.postType == 'want' && (parseInt($scope.post.floor_low) >= parseInt($scope.post.floor_high))){
            $scope.errorTip = 'this Floor high must greater than Floor low';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.post.price == undefined || $scope.post.price.toString().replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Price must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.post.price > 100000000){
        	$scope.errorTip = 'this Price not more than 8 length';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.post.postType == 'have' && ($scope.post.coop == undefined || $scope.post.coop.toString().replace(/\s+/g, "")) == ''){
            $scope.errorTip = 'this Prefer Coop must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.post.postType == 'have' && ($scope.post.coop > 100)){
        	$scope.errorTip = 'this Prefer Coop not more than 4 length';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
		var spinner = dialog.showSpinner();
		var req = {
            id: $scope.post.id,
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			post_type: $scope.post.postType,
			project_id: $scope.post.projectId,
			project_name: $scope.post.projectName,
			unit_type: $scope.post.type,
			exposure: $scope.post.exposure,
			price: $scope.post.price,
			coop: $scope.post.coop,
			floor_level: $scope.post.floor,
			expect_floor_low: $scope.post.floor_low,
			expect_floor_high: $scope.post.floor_high,
		}
		postService.updatemypost(req).then(function(res){
			dialog.closeSpinner(spinner.id);
			dialog.toast('update success');
			if($scope.post.postType == 'want'){
				$scope.post.floor = $scope.post.floor_low + '-' + $scope.post.floor_high;
			}
			StorageConfig.POST_STORAGE.putItem('post', $scope.post);
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	function jsonToArray(json){
		var array = new Array();
		for(var key in json){
			array.push({'key': key, 'value': json[key]});
		}
		return array;
	}
}]);