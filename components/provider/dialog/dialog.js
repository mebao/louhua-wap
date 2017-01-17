app.factory('dialog', ['ngDialog', function (ngDialog) {
    return {
        alert: function (html, opts) {                 
            var buttonText = (opts) ? opts.okText || '确定' : '确定';
            var titleText = (opts) ? opts.title || '温馨提示' : '温馨提示';
            var options = {
                overlay: true,
                contentHtml: '<div class="dialog-body">\
                        <div class="title">' + titleText + '</div>\
                        <div class="contentHtml">' + html + '</div>\
                        <div class="alertButton"><button class="btn btn-lg" ng-click="closeByOkButton(\'REPLACEDIALOGID\')">' + buttonText + '</button></div>\
                </div>'
            };
            angular.extend(options, (opts || {}));
            return ngDialog.open(options);
        },
        confirm: function (html, opts) {
            var okButtonText = (opts) ? opts.okText || '确定' : '确定';
            var cancelButtonText = (opts) ? opts.cancelText || '取消' : '取消';
            var titleText = (opts) ? opts.title || '温馨提示' : '温馨提示';
            var options = {
                overlay: true,
                contentHtml: '<div class="dialog-body">\
                        <div class="title">' + titleText + '</div>\
                        <div class="contentHtml">' + html + '</div>\
                        <div class="confirmButton">\
                            <div class="btn-group-level border-top">\
                                <div class="btn-left">\
                                    <button type="button" class="btn btn-lg border-right" ng-click="closeByCancelButton(\'REPLACEDIALOGID\')">' + cancelButtonText + '</button>\
                                </div>\
                                <div class="btn-right">\
                                    <button type="button" class="btn btn-lg" ng-click="closeByOkButton(\'REPLACEDIALOGID\')">' + okButtonText + '</button>\
                                </div>\
                            </div>\
                        </div>\
                </div>'
            };
            angular.extend(options, (opts || {}));
            return ngDialog.open(options);
        },
        toast: function (message, opts) {

            var options = {
                overlay: false,
                autoClose: true,
                timeout: 2000,
                contentHtml: '<div class="toast-body">\
            <table class="message"><tr><td>' + message + '</td></tr></table>\
        </div>'
            };
            angular.extend(options, (opts || {}));
            return ngDialog.open(options);
        },
        tipMessage: function (message, opts) {
            var options = {
                overlay: true,
                autoClose: true,
                timeout: 2000,
                contentHtml: '<div class="toast-body">\
            <table class="message"><tr><td>' + message + '</td></tr></table>\
        </div>'
            };
            angular.extend(options, (opts || {}));
            return ngDialog.open(options);
        },
        showSpinner: function (opts) {
            var spinnerTip = (opts) ? (opts.spinnerTip || '加载中...') : '加载中...';
            var options = {
                overlay: true,
                autoClose: true,
                timeout: 180000,
                // contentHtml: '<div class="spinner-body">\
                //     <div class="spinner"></div>\
                //     <div class="spinner-tip">' + spinnerTip + '</div>\
                //     <div class="spinner-close" ng-click="closeByCancelButton(\'REPLACEDIALOGID\')">\
                //         <span class="circle-close"></span>\
                //     </div>\
                // </div>'
                contentHtml: '<div class="spinner-body">\
                    <div class="logo-box">\
                        <img src="app/images/icon_loading.gif">\
                    </div>\
                    <div class="spinner-tip">' + spinnerTip + '</div>\
                    <div class="spinner-close" ng-click="closeByCancelButton(\'REPLACEDIALOGID\')">\
                        <span class="circle-close"></span>\
                    </div>\
                </div>'
            };
            angular.extend(options, (opts || {}));
            return ngDialog.open(options);
        },
        closeSpinner: function (id, opts, type) {
            setTimeout(function(){
                ngDialog.close(id,opts,type);
            }, 10);

        }
    }
}]);