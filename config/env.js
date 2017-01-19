(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.envs = factory();
    }
}(this, function (b) {
    var allEnvs = {
        product: {
            env:'product',
            api_url: 'http://api.louhua.meb168.com'
        },
        localhost: {
            env:'localhost',
            api_url: 'http://192.168.10.107/xinlouhua'
        }
    };
    var envs = allEnvs.product;//默认连接dev开发环境
    switch (window.location.host) {
        case 'm.mingyizhudao.com':
        {
            envs = allEnvs.product;
            break;
        }
        case 'localhost':
        {
            envs = allEnvs.localhost;
            break;
        }
    }
    return envs;
}));