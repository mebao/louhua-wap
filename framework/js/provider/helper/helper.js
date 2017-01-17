app.factory('helper', [function () {
    function _closePopOrDialog(value) {
        if (value === 1 || value === 0) {
            var dialogList = document.getElementsByClassName('ng-dialog');
            if (dialogList) {
                for (var i = 0; i < dialogList.length; i++) {
                    angular.element(dialogList[i]).remove();
                }
            }
        }
        if (value === 2 || value === 0) {
            var popList = document.getElementsByClassName('ng-pop');
            if (popList) {
                for (var i = 0; i < popList.length; i++) {
                    angular.element(popList[i]).remove();
                }
            }
        }

    }

    return {
        getUrlParam: function (key) {
            if (window.location.href.indexOf('?') == -1) {
                return false;
            }
            var paramsObj = {};
            var searchStr = window.location.href.split('\?')[1];
            var arrayParams = searchStr.split('\&');
            var length = arrayParams.length;
            for (var i = 0; i < length; i++) {
                paramsObj[arrayParams[i].split('\=')[0]] = arrayParams[i].split('\=')[1];
            }

            return paramsObj.hasOwnProperty(key) ? paramsObj[key] : false;
        },
        closeAllPopAndDialog: function () {
            _closePopOrDialog(0);
        },
        closeAllPop: function () {
            _closePopOrDialog(2);
        },
        closeAllDialog: function () {
            _closePopOrDialog(1);
        },
        isEmptyObject: function (obj) {

            /* eslint-disable no-unused-vars */
            // See https://github.com/eslint/eslint/issues/6125
            var name;

            for (name in obj) {
                return false;
            }
            return true;
        }
    }

}]);