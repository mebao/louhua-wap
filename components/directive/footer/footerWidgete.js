app.directive('footerWidget', function () {
    var ctrl = ['$scope', '$rootScope', 'StorageConfig', '$state', 'helper', 'CMSDataConfig', 'postService', function ($scope, $rootScope, StorageConfig, $state, helper, CMSDataConfig, postService) {
        var defaults = {
            enableFooter: true,
            enableCheckType: 1,
        };
        if(StorageConfig.FOOTER_STORAGE.getItem('show')){
            defaults.enableFooter=true;
        }
        $scope.defaults = angular.extend(angular.copy(defaults), window.footerConfig);
        $rootScope.$on('setFooterConfig', function (event, data) {
            var temp = angular.copy(defaults);
            $scope.defaults = angular.extend(temp, data);
        });

        //get projectList
        $scope.showChange = false;
        postService.selectoptions().then(function(res){
            var optionsProject = res.results.optionsProject
            for(var key in optionsProject){
                optionsProject[key] = optionsProject[key].length > 5 ? optionsProject[key].substring(0, 5) + '...' : optionsProject[key];
            }
            $scope.projectList = optionsProject;
        },function(res){});
        $scope.changeProject = function(_projectId){
            $scope.showChange = false;
            $state.go('layout.project', {
                projectId: _projectId
            });
        }

        $rootScope.$on('$locationChangeSuccess',function(){
            var currentHash = window.location.hash;
            //login check type
            var menuList = '';
            if($scope.defaults.enableCheckType == 0){
                menuList = CMSDataConfig.appMenus;
            }else{
                if(StorageConfig.TOKEN_STORAGE.getItem('username') && StorageConfig.TOKEN_STORAGE.getItem('token')){
                    menuList = CMSDataConfig.loginMenus;
                }else{
                    menuList = CMSDataConfig.appMenus;
                }
            }
            $scope.menuList = menuList;
            for (var i = menuList.length - 1; i >= 0; i--) {
                if (currentHash.split('#')[1] === menuList[i].url) {
                    $scope.selectedIndex = i;
                    StorageConfig.FOOTER_STORAGE.putItem('selectedItemIndex', i);
                    return true;
                }
            }
        });
        $scope.selectedIndex = StorageConfig.FOOTER_STORAGE.getItem('selectedItemIndex') || 0;
        $scope.selectItem = function (item, index) {
            if ($scope.selectedIndex != index) {
                $scope.showChange = false;
                if (item.beforeCall && typeof item.beforeCall === 'function') {
                    if (item.beforeCall()) {
                        $scope.selectedIndex = index;
                        StorageConfig.FOOTER_STORAGE.putItem('selectedItemIndex', index);
                        if (item.route) {
                            $state.go(item.route);
                        }
                    }
                } else {
                    $scope.selectedIndex = index;
                    StorageConfig.FOOTER_STORAGE.putItem('selectedItemIndex', index);
                    if (item.route) {
                        if($scope.selectedIndex == 0){
                            $state.go(item.route, {
                                projectId: StorageConfig.TOKEN_STORAGE.getItem('projectId') == undefined ? '' : StorageConfig.TOKEN_STORAGE.getItem('projectId')
                            });
                        }else{
                            $state.go(item.route);
                        }
                    }
                }

            }else{
                if($scope.selectedIndex == 0){
                    $scope.showChange = !$scope.showChange;
                }
            }
        };
    }];
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        controller: ctrl,
        templateUrl: "template/footer.html",
        scope: {
            menuList: '='
        },
        link: function () {

        }
    }
});
app.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/footer.html',
        '<footer class="layout-footer" id="layoutFooter" ng-show="defaults.enableFooter">\
        <div class="project-change" ng-show="showChange">\
            <div class="item" ng-repeat="(key, value) in projectList" ng-click="changeProject(key)" ng-bind="value"></div>\
        </div>\
        <div class="footer">\
            <div class="item" ng-repeat="item in menuList" ng-click="selectItem(item, $index)"><span class="iconfont" ng-class="{false:item.class, true: item.class+\'fill active\'}[$index == footerSelectedIndex]"></span><span class="text" ng-class="{\'active\':$index == selectedIndex}" ng-bind="item.text"></span></div>\
        </div></footer>');
}]);