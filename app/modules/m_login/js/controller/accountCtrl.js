app.controller('accountCtrl', ['$scope', 'dialog', 'CommonService', function($scope, dialog, CommonService){
	$scope.subscribe = false;
    var apiUrl = window.envs.api_url;
	
	$scope.checkSubscribe = function(){
		$scope.subscribe = !$scope.subscribe;
	}

    CommonService.uploadtoken().then(function(res){
        readyUpload(res.uptoken);
    },function(res){

    });

    $scope.do = function(){
    }

	function readyUpload(_token){
        UploadImg.init({
            id: 'uploadImgBox',
            multiple: false, // enable the component can select multiple files in one time. In mobile, please use the false.
            maxCount: 1, // the max number picture could upload.
            // autoUpload: false,
            //required: false, //ctrl you must upload images files or not. if false, the UploadImg.isFinished() init is true.
            // imgListArray: [],
            fileNum: getFileNum,
            upload: {
                uploadUrl: 'http://upload.qiniu.com/',
                token: _token,
                tokenUrl: apiUrl + '/xlhapi/uploadtoken',
                type: 'POST',
                async: true,
                nameSpace: '',
                submitBtnId: 'create',
                beforeCall: beforeCall,
                afterCall: afterCall,
                params: {},
                btnHtml: '',
            }
        });

        function getFileNum(num){
            console.log(num);
        }

        var spinner='';

        function beforeCall(doingCall){
            spinner=dialog.showSpinner();
            doingCall({});
        }

        function afterCall(upFileList){
            var requestObj={
                username: StorageConfig.TOKEN_STORAGE.getItem('username'),
                token: StorageConfig.TOKEN_STORAGE.getItem('token'),
                name: $scope.name,
                nickname: $scope.nickname,
                gender: $scope.gender,
                birth_date: $scope.birth_date,
                blood_type: $scope.blood_type,
                horoscope: $scope.horoscope,
                shengxiao: $scope.shengxiao,
                is_default: '1',
                remote_domain: 'http://og03472zu.bkt.clouddn.com',
                remote_file_key: upFileList[0].key
            }
            childService.createChild(requestObj).then(function(res){
                dialog.closeSpinner(spinner.id);
                $state.go('layout.home-addGrowth', {
                    id: res.results.id,
                    source: 'createChild'
                });
            },function(res){
                dialog.closeSpinner(spinner.id);
                dialog.alert(res.errorMsg);
            });
        }
    }
}])