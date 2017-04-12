app.controller('accountCtrl', ['$scope', 'dialog', 'CommonService', '$timeout', '$stateParams', '$state', 'StorageConfig', function($scope, dialog, CommonService, $timeout, $stateParams, $state, StorageConfig){
    $scope.errorMsg = false;
	$scope.subscribe = 'no';
	
	$scope.checkSubscribe = function(){
		$scope.subscribe = ($scope.subscribe == 'no' ? 'yes' : 'no');
	}

    $scope.accountId = $stateParams.accountId;

    $scope.account = function(){
        if($scope.username == undefined || $scope.username.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Email must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        //验证邮箱格式
        var usernameType = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if(!$scope.username.match(usernameType)){
            $scope.errorTip = 'this email format error';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.wechat_id == undefined || $scope.wechat_id.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Wechat ID must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.wechat_name == undefined || $scope.wechat_name.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Wechat Name must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.real_name == undefined || $scope.real_name.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Full Name must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.brokerage_name == undefined || $scope.brokerage_name.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Company must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.cell == undefined || $scope.cell.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Cell Phone must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.office_telephone == undefined || $scope.office_telephone.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Office Phone must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        if($scope.reco_number == undefined || $scope.reco_number.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Reco Number must input';
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        var spinner = dialog.showSpinner();
        var req = {
            user_id: $stateParams.id,
            username: $scope.username,
            wechat_name: $scope.wechat_name,
            wechat_id: $scope.wechat_id,
            real_name: $scope.real_name,
            brokerage_name: $scope.brokerage_name,
            cell: $scope.cell,
            office_telephone: $scope.office_telephone,
            reco_number: $scope.reco_number,
            subscribe: $scope.subscribe,
        }
        CommonService.useraccount(req).then(function(res){
            StorageConfig.TOKEN_STORAGE.putItem('username', $scope.username);
            dialog.closeSpinner(spinner.id);
            $state.go('layout.project');
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

}])