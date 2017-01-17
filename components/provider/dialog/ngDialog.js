/**
 * author: Atomic Rose
 * time: 2016年02月05日21:29:03
 */

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('angular'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['angular'], factory);
    } else {
        // Global Variables
        factory(root.angular);
    }
}(this, function (angular, undefined) {
    'use strict';
    var m = angular.module('ngDialog', []);
    m.provider('ngDialog', function () {
        var defaultOptions = {
            closeByDocument: false,
            overlay: true,
            contentHtml: '',
            templateUrl: '',
            closeCallback: false,
            autoClose: false,
            timeout: 2000
        };
        this.$get = ['$document', '$templateCache', '$q', '$compile', '$rootScope', '$http', function ($document, $templateCache, $q, $compile, $rootScope, $http) {

            var privateMethods = {};
            var allOptions = {};
            var allTimeout = {};
            var publicMethods = {
                open: function (opts) {
                    var self = this;
                    var options = angular.copy(defaultOptions);
                    angular.extend(options, (opts || {}));
                    var time = new Date();
                    var dialogId = 'dialog_' + time.getHours().toString() + time.getMinutes().toString() + time.getSeconds().toString()+ Math.random();
                    allOptions[dialogId] = options;

                    var html_overlay = options.overlay ? (options.closeByDocument ? '<div class="pop-mask" ng-click="closeByDocument(\'' + dialogId + '\')""></div>' : '<div class="pop-mask"></div>' ) : (options.closeByDocument ? '<div class="pop-mask transparent" ng-click="closeByDocument(\'' + dialogId + '\')""></div>' : '' );
                    var html_content = options.contentHtml || loadTemplate(options.templateUrl);
                    html_content = replaceWords(html_content,'REPLACEDIALOGID',dialogId);
                    var html = '<div class="ng-dialog">' + html_overlay + html_content + '</div>';

                    var $dialog, scope;

                    $q.when(loadTemplate(options.template || options.templateUrl)).then(function (template) {
                        //$templateCache.put(options.template || options.templateUrl, template);
                        self.$result = $dialog = angular.element('<div class="ng-dialog" ng-controller="dialogCommonCtrl" id="' + dialogId + '"></div>');
                        $dialog.html(html);
                        scope = angular.isObject(options.scope) ? options.scope.$new() : $rootScope.$new();

                        $compile($dialog)(scope);
                        $document.find('body').append($dialog);

                        if(options.autoClose){
                            allTimeout[dialogId] = setTimeout(function () {
                                self.close(dialogId, {}, 3);
                            }, options.timeout);
                        }

                    });
                    function replaceWords(str,reallyDo,replaceWith) {
                        var e=new RegExp(reallyDo,"g");
                        return str.replace(e, replaceWith);
                    }
                    function loadTemplateUrl(tmpl, config) {
                        return $http.get(tmpl, (config || {})).then(function (res) {
                            return res.data || '';
                        });
                    }

                    function loadTemplate(tmpl) {
                        if (!tmpl) {
                            return 'Empty template';
                        }

                        if (angular.isString(tmpl) && options.plain) {
                            return tmpl;
                        }

                        if (typeof options.cache === 'boolean' && !options.cache) {
                            return loadTemplateUrl(tmpl, {
                                cache: false
                            });
                        }

                        return $templateCache.get(tmpl) || loadTemplateUrl(tmpl, {
                                cache: true
                            });
                    }

                    return {
                        id: dialogId,
                        obj: $dialog
                    };
                },
                close: function (id, opts, value) {
                    var options = {};
                    if (allOptions[id]) {
                        options = angular.extend(allOptions[id], (opts || {}));
                    } else {
                        options = angular.extend(defaultOptions, (opts || {}));
                    }

                    var closeElement = document.getElementById(id);
                    angular.element(closeElement).remove();
                    if (options.closeCallback) {
                        options.closeCallback(value);
                    }
                }
            };
            return publicMethods;
        }];
    });
    m.controller('dialogCommonCtrl', ['$scope', 'ngDialog', function ($scope, ngDialog) {
        $scope.closeByOkButton = function (id) {
            ngDialog.close(id, {}, 1);
        };
        $scope.closeByCancelButton = function (id) {
            ngDialog.close(id, {}, 0);
        };
        $scope.closeByDocument = function (id) {
            ngDialog.close(id, {}, 2);
        };
    }]);

    return m;
}));