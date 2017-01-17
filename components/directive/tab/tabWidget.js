app.directive('tabWidget', function () {
    var ctrl = ['$scope', function ($scope) {

    }];
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        controller: ctrl,
        templateUrl: "template/tab.html",
        scope: {},
        link: function () {

        }
    }
});
app.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/tab.html',
        '<div class="tab-widget">\
            <div class="tab-header">\
                <ul>\
                    <li class="tab-item">密码登录</li>\
                </ul>\
            </div>\
        </div>');
}]);