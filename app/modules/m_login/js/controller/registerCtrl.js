app.controller('registerCtrl',['$scope', '$state', 'CommonService', 'dialog', '$timeout', function($scope, $state, CommonService, dialog, $timeout){
    $scope.errorMsg = false;
    $scope.createUser = function(){
        if($scope.username == undefined || $scope.password_raw == undefined || $scope.wechat_id == undefined || $scope.real_name == undefined || $scope.brokerage_name == undefined || $scope.cell == undefined || $scope.office_telephone == undefined || $scope.reco_number == undefined){
            $scope.errorMsg = true;
            $timeout(function(){
                $scope.errorMsg = false;
            },2000);
            return false;
        }
        var spinner = dialog.showSpinner();
        var req = {
            username: $scope.username,
            password_raw: $scope.password_raw,
            wechat_id: $scope.wechat_id,
            real_name: $scope.real_name,
            brokerage_name: $scope.brokerage_name,
            cell: $scope.cell,
            office_telephone: $scope.office_telephone,
            reco_number: $scope.reco_number,
        }
        CommonService.userregist(req).then(function(res){
            dialog.closeSpinner(spinner.id);
            $state.go('layout.login');
        }, function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }
}]);