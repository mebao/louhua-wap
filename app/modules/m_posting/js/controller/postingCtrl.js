app.controller('postingCtrl', ['$scope', 'StorageConfig', 'postService', 'dialog', 'projectService', '$timeout', 'postService', '$state', '$stateParams', function($scope, StorageConfig, postService, dialog, projectService, $timeout, postService, $state, $stateParams){
	$scope.selectedTab = $stateParams.tab == undefined ? 0 : $stateParams.tab;

	//post list: type select
	$scope.showPostType = false;
	$scope.checkTab = function(_index){
		if((_index == 1) && (_index == $scope.selectedTab)){
			$scope.showPostType = !$scope.showPostType;
		}
		if(_index == 0){
			$scope.showPostType = false;
		}
		$scope.selectedTab = _index;
	}

	var postListReq = {
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		project_id: StorageConfig.TOKEN_STORAGE.getItem('projectId') == undefined ? '' : StorageConfig.TOKEN_STORAGE.getItem('projectId'),
		post_type: $stateParams.type == undefined ? 'have' : $stateParams.type

	}

	$scope.myPostType = 'have';
	$scope.postType = function(_type){
		$scope.myPostType = _type;
		var spinner = dialog.showSpinner();
		$scope.showPostType = false;
		postListReq.post_type = _type;
		postListReq.postUnitType = undefined;
		postListReq.postExposure = undefined;
		getWant();
		dialog.closeSpinner(spinner.id);
	}

	//post list: unit type...exposure
	$scope.postFloor = 0;
	$scope.postPrice = 0;
	$scope.postCoop = 0;
	$scope.postSort = function(type, num){
		num++;
		if(num == 3){
			num = 0;
		}
		if(num == 0){
			$scope.postList = arrayCopy($scope.postListStorage);
		}
		if(num == 1){
			$scope.postList = sortPositiveByKey($scope.postList, type, 'num');
		}else if(num == 2){
			$scope.postList = sortNegativeByKey($scope.postList, type, 'num');
		}
		if(type == 'floor'){
			$scope.postFloor = num;
			$scope.postPrice = 0;
			$scope.postCoop = 0;
		}else if(type == 'price'){
			$scope.postFloor = 0;
			$scope.postPrice = num;
			$scope.postCoop = 0;
		}else if(type == 'coop'){
			$scope.postFloor = 0;
			$scope.postPrice = 0;
			$scope.postCoop = num;
		}
	}

	//post unit type
	$scope.postUnitType = false;
	$scope.checkPostUnitType = function(){
		$scope.postExposure = false;
		$scope.postUnitType = !$scope.postUnitType;
	}
	//post exposur
	$scope.postExposure = false;
	$scope.checkPostExposure = function(){
		$scope.postUnitType = false;
		$scope.postExposure = !$scope.postExposure;
	}

	$scope.postlistData = function(_type, data){
		if(_type == 'unitType'){
			if(data == 'all'){
				postListReq.postUnitType = undefined;
			}else{
				postListReq.postUnitType = data;
			}
			postListReq.postExposure = undefined;
			$scope.postUnitType = !$scope.postUnitType;
		}else{
			if(data == 'all'){
				postListReq.postExposure = undefined;
			}else{
				postListReq.postExposure = data;
			}
			$scope.postExposure = !$scope.postExposure;
		}
		getWant();
	}

	//获取筛选条件
	postService.selectoptions().then(function(res){
		$scope.optionsExposure = res.results.optionsExposure;
		$scope.optionsUnitType = res.results.optionsUnitType;
	},function(res){

	});
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
        if($scope.selectedType == 'want' && (parseInt($scope.expect_floor_low) >= parseInt($scope.expect_floor_high))){
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
        if($scope.selectedType == 'have' && ($scope.coop == undefined || $scope.coop.toString().replace(/\s+/g, "")) == ''){
            $scope.errorTip = 'this Prefer Coop must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.selectedType == 'have' && ($scope.coop > 100)){
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
			dialog.toast('success, Unit ID: ' + res.results.id);
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
		postService.postlist(postListReq).then(function(res){
			$scope.postListStorage = res.results.postList;
			$scope.postList = arrayCopy(res.results.postList);
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

	$scope.edit = function(_post){
		if(_post.isupdate == 0){
			dialog.toast('This unit cannot be edited');
		}else{
			StorageConfig.POST_STORAGE.putItem('post', _post);
			$state.go('layout.editPost');
		}
	}

	$scope.delete = function(_post){
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

	function sortPositiveByKey(array, key, type) {
     	return array.sort(function(a, b) {
     		if(type == 'num'){
         		var x = parseFloat(a[key]); var y = parseFloat(b[key]);
     		}else{
         		var x = a[key]; var y = b[key];
     		}
         	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
     	});
 	}

 	function sortNegativeByKey(array, key, type) {
     	return array.sort(function(a, b) {
     		if(type == 'num'){
         		var x = parseFloat(a[key]); var y = parseFloat(b[key]);
     		}else{
         		var x = a[key]; var y = b[key];
     		}
         	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
     	});
 	}

 	//array copy
 	function arrayCopy(array){
 		var newArray = new Array();
 		for(var i = 0; i<array.length; i++){
 			newArray.push(array[i]);
 		}
 		return newArray;
 	}
 	
}]);