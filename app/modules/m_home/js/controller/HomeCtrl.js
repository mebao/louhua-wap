app.controller('HomeCtrl', ['$scope', '$rootScope', '$state', 'dialog', 'StorageConfig',function ($scope, $rootScope, $state, dialog, StorageConfig) {
    window.headerConfig = {
        enableBack: false,
        title: 'app',
        enableRefresh: false,
    };

    $scope.header = true;
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    $scope.legend = ['身高', '体重'];
    $scope.item = [];
    $scope.data = [
		["32", "24", "23"],
		["15", "12"]
    ];
}]);