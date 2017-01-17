app.service('projectService', ['BaseHttpRequest', function(BaseHttpRequest){
	var apiUrl = window.envs.api_url;

	function projectDto(res){
		return res;
	}

	function orderwantlistDto(res){
		return res;
	}

	function orderhavelistDto(res){
		return res;
	}

	function userwatchDto(res){
		return res;
	}

	var service = {
		project: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/xlhapi/project'
			}
			return BaseHttpRequest.get(requestObj, projectDto);
		},
		orderwantlist: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/xlhapi/orderwantlist?username=' + urlOptions.username + '&token=' + urlOptions.token
			}
			return BaseHttpRequest.get(requestObj, orderwantlistDto);
		},
		orderhavelist: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/xlhapi/orderhavelist?username=' + urlOptions.username + '&token=' + urlOptions.token
			}
			return BaseHttpRequest.get(requestObj, orderhavelistDto);
		},
		userwatch: function(params){
			var requestObj = {
				url: apiUrl + '/xlhapi/userwatch',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userwatchDto);
		}
	}
	return service;
}]);