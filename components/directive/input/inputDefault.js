app.directive('input',function(){
    return {
        restrict: 'E',
        scope: {},
        link: function (scope,ele) {
            ele[0].setAttribute('autocomplete', "off");
        }
    }
});