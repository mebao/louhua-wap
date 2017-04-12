app.controller('registerCtrl',['$scope', '$state', 'CommonService', 'dialog', '$timeout', function($scope, $state, CommonService, dialog, $timeout){
    $scope.errorMsg = false;
    $scope.createUser = function(){
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
        // if($scope.password_raw == undefined || $scope.password_raw.replace(/\s+/g, "") == ''){
        //     $scope.errorTip = 'this Password must input';
        //     $scope.errorMsg = true;
        //     $timeout(function(){
        //         $scope.errorMsg = false;
        //     },2000);
        //     return false;
        // }
        //验证密码格式
        // var passwordType = /^(\w){4,16}$/;
        // if(!$scope.password_raw.match(passwordType)){
        //     $scope.errorTip = 'this Password must be a-zA-Z0-9_(4,16)';
        //     $scope.errorMsg = true;
        //     $timeout(function(){
        //         $scope.errorMsg = false;
        //     },2000);
        //     return false;
        // }
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
            username: $scope.username,
            password_raw: $scope.cell,
            wechat_id: $scope.wechat_id,
            wechat_name: $scope.wechat_name,
            real_name: $scope.real_name,
            brokerage_name: $scope.brokerage_name,
            cell: $scope.cell,
            office_telephone: $scope.office_telephone,
            reco_number: $scope.reco_number,
        }
        CommonService.userregist(req).then(function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert('Please log in to verify the mailbox.', {
                closeCallback: function(value){
                        if(value == 0 ){
                        }else{
                            $state.go('layout.login');
                        }
                    }
                }
            );
            
        }, function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }
}]);