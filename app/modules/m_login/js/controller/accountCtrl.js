app.controller('accountCtrl', ['$scope', 'dialog', 'CommonService', '$timeout', '$stateParams', '$state', function($scope, dialog, CommonService, $timeout, $stateParams, $state){
    $scope.errorMsg = false;
	$scope.subscribe = 'no';
	
	$scope.checkSubscribe = function(){
		$scope.subscribe = ($scope.subscribe == 'no' ? 'yes' : 'no');
	}

    $scope.accountId = $stateParams.accountId;

    $scope.account = function(){
        if($scope.wechat_id == undefined || $scope.real_name == undefined || $scope.brokerage_name == undefined || $scope.cell == undefined || $scope.office_telephone == undefined || $scope.reco_number == undefined){
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