app.directive('footerWidget', function () {
    var ctrl = ['$scope', '$rootScope', 'StorageConfig', '$state', 'helper', 'CMSDataConfig', function ($scope, $rootScope, StorageConfig, $state, helper, CMSDataConfig) {
        var defaults = {
            enableFooter: false
        };
        if(StorageConfig.FOOTER_STORAGE.getItem('show')){
            defaults.enableFooter=true;
        }
        $scope.defaults = angular.extend(angular.copy(defaults), window.footerConfig);
        $rootScope.$on('setFooterConfig', function (event, data) {
            var temp = angular.copy(defaults);
            $scope.defaults = angular.extend(temp, data);
        });

        $rootScope.$on('$locationChangeSuccess',function(){
            var currentHash = window.location.hash;
            var menuList = CMSDataConfig.appMenus;
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
                        $state.go(item.route);
                    }
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
        <div class="footer">\
            <div class="item" ng-repeat="item in menuList" ng-click="selectItem(item, $index)"><span class="icon {{item.class}}" ng-class="{\'active\':$index == selectedIndex}"></span><span class="text" ng-class="{\'active\':$index == selectedIndex}" ng-bind="item.text"></span></div>\
        </div></footer>');
}]);