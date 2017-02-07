app.service('userService', ['BaseHttpRequest', function(BaseHttpRequest){
	var apiUrl = window.envs.api_url;

	function getuserinfoDto(res){
		return res;
	}

	var service = {
		getuserinfo: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/xlhapi/userinfo?username=' + urlOptions.username + '&token=' + urlOptions.token
			}
			return BaseHttpRequest.get(requestObj, getuserinfoDto);
		}
	}
	return service;
}]);