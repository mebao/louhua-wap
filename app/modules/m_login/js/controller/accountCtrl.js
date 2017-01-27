app.controller('accountCtrl', ['$scope', 'dialog', 'CommonService', '$timeout', '$stateParams', '$state', function($scope, dialog, CommonService, $timeout, $stateParams, $state){
    $scope.errorMsg = false;
	$scope.subscribe = 'no';
	
	$scope.checkSubscribe = function(){
		$scope.subscribe = ($scope.subscribe == 'no' ? 'yes' : 'no');
	}

    $scope.accountId = $stateParams.accountId;

    $scope.account = function(){
        if($scope.wechat_id == undefined || $scope.wechat_id.replace(/\s+/g, "") == ''){
            $scope.errorTip = 'this Wechat ID must input';
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
            wechat_id: $scope.wechat_id,
            real_name: $scope.real_name,
            brokerage_name: $scope.brokerage_name,
            cell: $scope.cell,
            office_telephone: $scope.office_telephone,
            reco_number: $scope.reco_number,
            subscribe: $scope.subscribe,
        }
        CommonService.useraccount(req).then(function(res){
            dialog.closeSpinner(spinner.id);
            $state.go('layout.project');
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

}])