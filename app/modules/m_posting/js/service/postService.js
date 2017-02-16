app.service('postService', ['BaseHttpRequest', function(BaseHttpRequest){
	var apiUrl = window.envs.api_url;

	function userpostDto(res){
		return res;
	}

	function postlistDto(res){
		return res;
	}

	function selectoptionsDto(res){
		return res;
	}

	function deletemypostDto(res){
		return res;
	}

	function updatemypostDto(res){
		return res;
	}

	var service = {
		userpost: function(params){
			var requestObj = {
				url: apiUrl + '/xlhapi/userpost',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userpostDto);
		},
		postlist: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/xlhapi/postlist?username=' + urlOptions.username + '&token=' + urlOptions.token + '&post_type=' + urlOptions.post_type + (urlOptions.postUnitType ? ('&unit_type=' + urlOptions.postUnitType) : '') + (urlOptions.postExposure ? ('&exposure=' + urlOptions.postExposure) : '')
			}
			return BaseHttpRequest.get(requestObj, postlistDto);
		},
		selectoptions: function(){
			var requestObj = {
				url: apiUrl + '/xlhapi/selectoptions'
			}
			return BaseHttpRequest.get(requestObj, selectoptionsDto);
		},
		deletemypost: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/xlhapi/mypost/' + urlOptions.id + '?username=' + urlOptions.username + '&token=' + urlOptions.token + '&id=' + urlOptions.id + '&post_type=' + urlOptions.post_type
			}
			return BaseHttpRequest.delete(requestObj, deletemypostDto);
		},
		updatemypost: function(params){
			var requestObj = {
				url: apiUrl + '/xlhapi/updatemypost/' + params.id,
				data: params
			}
			return BaseHttpRequest.post(requestObj, updatemypostDto);
		}
	}
	return service;
}]);