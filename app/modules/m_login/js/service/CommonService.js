app.service('CommonService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function userregistDto(res){
		return res;
	}

	function userloginDto(res){
		return res;
	}

	function uploadtokenDto(res){
		return res;
	}

	var service={
		userregist: function(params){
			var requestObj = {
				url: apiUrl + '/xlhapi/userregist',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userregistDto);
		},
		userlogin: function(params){
			var requestObj = {
				url: apiUrl + '/xlhapi/userlogin',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userloginDto);
		},
		uploadtoken: function(params){
			var requestObj = {
				url: apiUrl + '/xlhapi/uploadtoken'
			}
			return BaseHttpRequest.get(requestObj, uploadtokenDto);
		}
	}
    return service;
}]);