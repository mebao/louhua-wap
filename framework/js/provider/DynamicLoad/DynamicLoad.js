(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("DynamicLoad requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
    // Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    //var m = angular.module('ngInject',[]);
    //app.requires.push('ngInject');

    var DynamicLoad = {
        includeJs: _includeJs,
        includeCss: _includeCss,
        includeComponents: _includeComponents,
        loadedSource: {},
        jsReadyCount: 0,
        cssReadyCount: 0,
        ready: _readyCall
    };

    function _readyCall() {
        if (arguments && arguments.length) {
            var dynamicObj = arguments[0];
            var callArray = arguments[arguments.length - 1];
            if (!(typeof dynamicObj === 'object')) {
                throw error('The first argument must be the object, include {components, jsFiles, cssFiles}');
            }
            if (!(typeof callArray === 'object' || typeof callArray.length === 'number')) {
                throw error('The second argument must be the  array');
            }
            var injectParam;
            var callback = callArray[callArray.length - 1];
            if (callArray.length > 1) {
                injectParam = callArray.slice(0, callArray.length - 1);
            }
            if (!(typeof callback === 'function')) {
                throw error('The second argument must be the array. And in the array, the last must be the callback');
            }


            if (dynamicObj.components && dynamicObj.components.length) {
                _includeComponents(dynamicObj.components);
            }
            if (dynamicObj.jsFiles && dynamicObj.jsFiles.length) {
                _includeJs(dynamicObj.jsFiles);
            }
            if (dynamicObj.cssFiles && dynamicObj.cssFiles.length) {
                _includeCss(dynamicObj.cssFiles);
            }

            var readyInterval = setInterval(function () {
                if (DynamicLoad.jsReadyCount === 0 && DynamicLoad.cssReadyCount === 0) {
                    clearInterval(readyInterval);
                    if (dynamicObj.modules && dynamicObj.modules.length) {
                        for (var i = 0, len = dynamicObj.modules.length; i < len; i++) {
                            if (!app.requires.hasOwnProperty(dynamicObj.modules[i])) {
                                app.requires.push(dynamicObj.modules[i]);
                            }
                        }
                    }
                    var myInject = angular.injector(['meb-app']);
                    var argParam = [];
                    if (injectParam) {
                        for (var j = 0, le = injectParam.length; j < le; j++) {
                            argParam.push(myInject.get(injectParam[j]));
                        }
                    }
                    return callback.apply(this, argParam);
                }
            }, 500);

        } else {
            throw error('The ready() must enter the array type arguments');
        }
    }

    function _includeJs(urlArray, callback) {
        DynamicLoad.jsReadyCount++;
        var body = document.body;
        var count = 0;
        for (var i = 0, len = urlArray.length; i < len; i++) {
            var url = urlArray[i];
            if (_ignoreTheSameSource(url)) {
                var jsElement = document.createElement('script');
                jsElement.setAttribute('src', url);
                body.appendChild(jsElement);
                jsElement.onload = function () {
                    DynamicLoad.loadedSource[url] = true;
                    count++;
                    if (count == len) {
                        DynamicLoad.jsReadyCount--;
                    }
                };
                jsElement.onerror = function () {
                    count++;
                    if (count == len) {
                        DynamicLoad.jsReadyCount--;
                    }
                };
            } else {
                count++;
                if (count == len) {
                    DynamicLoad.jsReadyCount--;
                }
            }
        }
    }

    function _includeCss(urlArray, callback) {
        DynamicLoad.cssReadyCount++;
        var head = document.getElementsByTagName('head')[0];
        var count = 0;
        for (var i = 0, len = urlArray.length; i < len; i++) {
            var url = urlArray[i];
            if (_ignoreTheSameSource(url)) {
                var cssElement = document.createElement('link');
                cssElement.setAttribute('rel', 'stylesheet');
                cssElement.setAttribute('href', url);
                head.appendChild(cssElement);
                cssElement.onload = function () {
                    DynamicLoad.loadedSource[url] = true;
                    count++;
                    if (count == len) {
                        DynamicLoad.cssReadyCount--;
                    }
                };
                cssElement.onerror = function () {
                    count++;
                    if (count == len) {
                        DynamicLoad.cssReadyCount--;
                    }
                };
            } else {
                count++;
                if (count == len) {
                    DynamicLoad.cssReadyCount--;
                }
            }
        }
    }

    function _ignoreTheSameSource(url) {
        return (!DynamicLoad.loadedSource.hasOwnProperty(url));
    }

    function _includeComponents(componentsArray, callback, option) {
        var jsArray = [];
        var cssArray = [];
        //if it's the array
        for (var i = 0, len = componentsArray.length; i < len; i++) {
            var temp = componentsArray[i];

            if (typeof temp === 'string') {
                jsArray.push('components/provider/' + temp + '/' + temp + '.js');
                cssArray.push('components/provider/' + temp + '/' + temp + '.css');
            }
            if (typeof temp === 'object' && typeof  temp.length === 'number') {
                if (temp.length === 2 && temp[1] === false) {
                    jsArray.push('components/provider/' + temp[0] + '/' + temp[0] + '.js');
                } else {
                    jsArray.push('components/provider/' + temp[0] + '/' + temp[0] + '.js');
                    cssArray.push('components/provider/' + temp[0] + '/' + temp[0] + '.css');
                }
            }
        }
        _includeJs(jsArray, callback);
        _includeCss(cssArray, function () {
            console.log('The css have loaded.');
        })
    }

    if (!noGlobal) {
        window.DynamicLoad = DynamicLoad;
    }
    return DynamicLoad;
}));