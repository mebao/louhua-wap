app.filter('formatMoney',['$sce',function($sce){
    return function(value){
        return value / 100;
    };
}]);
app.filter('pennyToDollar',['$sce', function($sce){
    return function(account){
        if(account){
            var str = account.toString();
            var length = str.length;
            var resMoney = '';
            if (length < 2) {
                resMoney = '0.0' + str;
            }
            if (length == 2) {
                resMoney = '0.' + str;
            }
            if (length > 2) {
                resMoney = str.substring(0, length - 2) + '.' + str.substring(length - 2, length);
            }
            return resMoney;
        }
    }
}]);