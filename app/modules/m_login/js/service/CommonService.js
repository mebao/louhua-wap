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

	function useraccountDto(res){
		return res;
	}

	function wechatloginDto(res){
		return res;
	}

	function loginwxuserDto(res){
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
		},
		useraccount: function(params){
			var requestObj = {
				url: apiUrl + '/xlhapi/useraccount',
				data: params
			}
			return BaseHttpRequest.post(requestObj, useraccountDto);
		},
		wechatlogin: function(){
			var requestObj = {
				url: apiUrl + '/xlhapi/wechatlogin'
			}
			return BaseHttpRequest.get(requestObj, wechatloginDto);
		},
		loginwxuser: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/xlhapi/loginwxuser?userid=' + urlOptions.userid
			}
			return BaseHttpRequest.get(requestObj, loginwxuserDto);
		}
	}
    return service;
}]);