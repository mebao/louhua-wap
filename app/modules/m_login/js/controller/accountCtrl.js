app.controller('accountCtrl', ['$scope', 'dialog', 'CommonService', '$timeout', function($scope, dialog, CommonService, $timeout){
    $scope.errorMsg = false;
	$scope.subscribe = 'no';
	
	$scope.checkSubscribe = function(){
		$scope.subscribe = ($scope.subscribe == 'no' ? 'yes' : 'no');
	}

    $scope.accountId = '0123';
    $scope.id = 10;

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
            user_id: $scope.id,
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
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

}])