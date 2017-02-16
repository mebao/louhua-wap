app.factory('StorageConfig', ['ngStorage', function (ngStorage) {
    //定义了common的localStorage，可以放入app公用的一些数据。注意：此数据会不会因为浏览器关闭而删除，不得放入敏感数据
    var common_storage = ngStorage.localStorage('common_storage');
    //默认token的sessionStorage，用来存放当前的token。用户关闭浏览器后即删除
    var session_token = ngStorage.localStorage('session_token');
    //用于存储登录拦截的参数
    var intercept_storage = ngStorage.sessionStorage('intercept');
    //存储footer
    var footer_storage = ngStorage.sessionStorage('footer');
    //用于存储首页默认I have或I want
    var project_storage = ngStorage.sessionStorage('project');
    //用于存储需要编辑的post
    var post_storage = ngStorage.sessionStorage('post');
    return {
        COMMON_STORAGE: common_storage,
        TOKEN_STORAGE: session_token,
        INTERCEPT_STORAGE: intercept_storage,
        FOOTER_STORAGE: footer_storage,
        PROJECT_STORAGE: project_storage,
        POST_STORAGE: post_storage,
    };
}]);