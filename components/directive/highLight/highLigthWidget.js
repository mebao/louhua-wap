app.directive('highLightWidget', function () {
    var ctrl = ['$scope','$sce', function ($scope,$sce) {
        if ($scope.defaultValue&&$scope.highLightValue) {
            if ($scope.defaultValue.indexOf($scope.highLightValue)!=-1) {
                var _defaultValue = $scope.defaultValue;
                var _highLightValue = $scope.highLightValue;
                var _vArray = _defaultValue.split(_highLightValue);
                var _bindHtml = '';
                for(var i=0; i<_vArray.length; i++){
                    if (_vArray[i]==''&&i!=(_vArray.length-1)) {
                        _bindHtml += '<span class="high-light-text">'+_highLightValue+'</span>';
                    }
                    else if(i==(_vArray.length-1)){
                        _bindHtml += '<span>'+_vArray[i]+'</span>';
                    }
                    else{
                        _bindHtml += '<span>'+_vArray[i]+'</span><span class="high-light-text">'+_highLightValue+'</span>';
                    }
                }
                $scope.bindHtml = $sce.trustAsHtml(_bindHtml);
            }
        }
    }];
    return {
        restrict: 'E',
        replace: true,
        controller: ctrl,
        templateUrl: "template/highLight.html",
        scope: {
            highLightValue: '=',
            defaultValue: '='
        }
    }
});
app.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/highLight.html',
        '<p class="high-light-widget" ng-bind-html="bindHtml">\
        </p>');
}]);

