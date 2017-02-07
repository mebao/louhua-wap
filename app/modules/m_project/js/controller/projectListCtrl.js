app.controller('projectListCtrl', ['$scope', 'projectService', 'StorageConfig', 'dialog', '$timeout', 'postService', function($scope, projectService, StorageConfig, dialog, $timeout, postService){
	$scope.matchOk = false;
	if(StorageConfig.PROJECT_STORAGE.getItem('listTab')){
		$scope.selectedTab = StorageConfig.PROJECT_STORAGE.getItem('listTab');
	}else{
		$scope.selectedTab = 0;
	}
	$scope.checkTab = function(_index){
		$scope.selectedTab = _index;
		StorageConfig.PROJECT_STORAGE.putItem('listTab', _index);
	}


	var req = {
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
	}
	getData();

	function getData(){
		var spinner = dialog.showSpinner();
		getHavelistData(spinner);
		getWantlistData();
		//获取筛选条件
		postService.selectoptions().then(function(res){
			$scope.optionsExposure = res.results.optionsExposure;
			$scope.optionsUnitType = res.results.optionsUnitType;
		},function(res){

		});
	}

	function getHavelistData(spinner){
		projectService.orderhavelist(req).then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.haveListStorage = res.results.postList;
			$scope.haveList = arrayCopy(res.results.postList);
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	function getWantlistData(spinner){
		projectService.orderwantlist(req).then(function(res){
			if(spinner != null){
				dialog.closeSpinner(spinner.id);
			}
			$scope.wantListStorage = res.results.postList;
			$scope.wantList = arrayCopy(res.results.postList);
		},function(res){
			if(spinner != null){
				dialog.closeSpinner(spinner.id);
			}
		});
	}

	$scope.checkHaveItem = function(_index){
		$scope.selectedHaveItem = _index;
	}

	$scope.checkWantItem = function(_index){
		$scope.selectedWantItem = _index;
	}

	//have unit type
	$scope.haveUnitType = false;
	$scope.checkHaveUnitType = function(){
		$scope.haveExposure = false;
		$scope.haveUnitType = !$scope.haveUnitType;
	}
	//have exposur
	$scope.haveExposure = false;
	$scope.checkHaveExposure = function(){
		$scope.haveUnitType = false;
		$scope.haveExposure = !$scope.haveExposure;
	}

	$scope.havelistData = function(_type, data){
		if(_type == 'unitType'){
			if(data == 'all'){
				req.haveUnitType = undefined;
			}else{
				req.haveUnitType = data;
			}
			req.haveExposure = undefined;
			$scope.haveUnitType = !$scope.haveUnitType;
		}else{
			if(data == 'all'){
				req.haveExposure = undefined;
			}else{
				req.haveExposure = data;
			}
			$scope.haveExposure = !$scope.haveExposure;
		}
		var spinner = dialog.showSpinner();
		getHavelistData(spinner);
	}

	//want unit type
	$scope.wantUnitType = false;
	$scope.checkWantUnitType = function(){
		$scope.wantExposure = false;
		$scope.wantUnitType = !$scope.wantUnitType;
	}
	//want exposur
	$scope.wantExposure = false;
	$scope.checkWantExposure = function(){
		$scope.wantUnitType = false;
		$scope.wantExposure = !$scope.wantExposure;
	}

	$scope.wantlistData = function(_type, data){
		if(_type == 'unitType'){
			if(data == 'all'){
				req.wantUnitType = undefined;
			}else{
				req.wantUnitType = data;
			}
			req.wantExposure = undefined;
			$scope.wantUnitType = !$scope.wantUnitType;
		}else{
			if(data == 'all'){
				req.wantExposure = undefined;
			}else{
				req.wantExposure = data;
			}
			$scope.wantExposure = !$scope.wantExposure;
		}
		var spinner = dialog.showSpinner();
		getWantlistData(spinner);
	}

	$scope.match = function(_id, _type){
		var spinner = dialog.showSpinner();
		var params = {
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			id: _id,
			post_type: _type
		}
		projectService.userwatch(params).then(function(res){
			$scope.selectedHaveItem = 0;
			dialog.closeSpinner(spinner.id);
			$scope.matchOk = true;
			$timeout(function(){
				$scope.matchOk = false;
			},2000);
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.haveFloor = 0;
	$scope.havePrice = 0;
	$scope.haveCoop = 0;
	//have排序
	$scope.haveSort = function(type, num){
		num++;
		if(num == 3){
			num = 0;
		}
		if(num == 0){
			$scope.haveList = arrayCopy($scope.haveListStorage);
		}
		if(num == 1){
			$scope.haveList = sortPositiveByKey($scope.haveList, type, 'num');
		}else if(num == 2){
			$scope.haveList = sortNegativeByKey($scope.haveList, type, 'num');
		}
		if(type == 'floor'){
			$scope.haveFloor = num;
			$scope.havePrice = 0;
			$scope.haveCoop = 0;
		}else if(type == 'price'){
			$scope.haveFloor = 0;
			$scope.havePrice = num;
			$scope.haveCoop = 0;
		}else if(type == 'coop'){
			$scope.haveFloor = 0;
			$scope.havePrice = 0;
			$scope.haveCoop = num;
		}
	}


	$scope.wantFloor = 0;
	$scope.wantPrice = 0;
	$scope.wantCoop = 0;
	//want排序
	$scope.wantSort = function(type, num){
		num++;
		if(num == 3){
			num = 0;
		}
		if(num == 0){
			$scope.wantList = arrayCopy($scope.wantListStorage);
		}
		if(num == 1){
			$scope.wantList = sortPositiveByKey($scope.wantList, type, (type == 'floor'? 'string': 'num'));
		}else if(num == 2){
			$scope.wantList = sortNegativeByKey($scope.wantList, type, (type == 'floor'? 'string': 'num'));
		}
		if(type == 'floor'){
			$scope.wantFloor = num;
			$scope.wantPrice = 0;
			$scope.wantCoop = 0;
		}else if(type == 'price'){
			$scope.wantFloor = 0;
			$scope.wantPrice = num;
			$scope.wantCoop = 0;
		}else if(type == 'coop'){
			$scope.wantFloor = 0;
			$scope.wantPrice = 0;
			$scope.wantCoop = num;
		}
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

 	function sort(){
 		
 	}
}]);