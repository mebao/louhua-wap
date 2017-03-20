app.controller('selectProjectCtrl', ['$scope', 'postService', 'dialog', '$state', function($scope, postService, dialog, $state){
	var spinner = dialog.showSpinner();
	postService.selectoptions().then(function(res){
        dialog.closeSpinner(spinner.id);
        $scope.optionsProject = res.results.optionsProject;
    },function(res){
        dialog.closeSpinner(spinner.id);
        dialog.alert(res.errorMsg);
    });

    $scope.goProject = function(_id){
    	$state.go('layout.project', {
    		projectId: _id
    	});
    }
}]);