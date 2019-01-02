;(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global, require('./api-2.0'));
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window) {
    var _const = {
        SHOW_MENU : 'CHELUN_SHOW_OPTION_MENU',//是否显示右上角菜单按钮
        MENU_ITEMS: 'CHELUN_SHOW_MENU_ITEMS',//显示的功能按钮列表
        SHARE_CLMESSAGE : 'HELUN_SHARE_DATA_CLMESSAGE',//车轮车友分享内容
        SHARE_WXTIMELIN : 'CHELUN_SHARE_DATA_WXTIMELINE',//微信朋友圈分享内容
        SHARE_WXMESSAGE : 'CHELUN_SHARE_DATA_WXMESSAGE',//微信朋友分享内容
        SHARE_QQ : 'CHELUN_SHARE_DATA_QQ',//QQ好友分享内容
        SHARE_SINA : 'CHELUN_SHARE_DATA_SINA',//新浪微博分享内容
        SHARE_SMS : 'CHELUN_SHARE_DATA_SMS',//发短信内容
        CUSTOM_CONFIG : 'CHELUN_CUSTOM_CONFIG',//自定义配置
        DISSYS_URLLIST : 'CHELUN_DISSYS_URLLIST' //禁止拼系统参数的url配置列表
    };
    var _api = {
        consts : _const,
        getua : function(){//获取ua信息
            var _ua = navigator.userAgent;
            if (_ua.indexOf('ChelunWelfare') > -1) {
                return 'ChelunWelfare';
            };

            if (_ua.indexOf('Chelun') > -1) {
                return 'Chelun';
            };

            if (_ua.match(/MicroMessenger/i) == 'micromessenger') {
                return 'weixin';
            };

            return 'others : ' + _ua;
        },
        cookie: function(name) {//设置或根据名字获取cookie
            var ck = document.cookie;
            if(!ck) {//当前浏览器不支持cookie
                return '';
            }
            var values = ck.split(';');
            var length = values.length;
            var attr = {};
            var value, value_attr;
            for(var i=0; i < length; i++) {
                value = values[i];
                value_attr = value.split('=');
                value_attr[0] = value_attr[0].replace(/^\s+|\s+$/,"");
                attr[value_attr[0]] = value_attr[1];
            }

            if(arguments.length == 1) {
                return attr[name] !== undefined ? attr[name] : '';
            }
            return attr;
        },
        hideMenu: function(){//隐藏右上角菜单
            window[this.consts.SHOW_MENU] = 0;
        },
        showMenu: function(){//显示右上角菜单
            window[this.consts.SHOW_MENU] = 1;
        },
        setMenu:function(args, action){//添加显示的按钮
            var menu = this.consts.MENU_ITEMS;
            window[menu] = window[menu] || [];
            //判断是数组，不是数组就直接返回
            if(args && Object.prototype.toString.call(args) !== '[object Array]') {
                return window[menu];
            }
            switch (action) {
                case 1://添加
                    args.forEach(function(arg) {
                        if(window[menu].indexOf(arg) >= 0) {
                                return;
                        }
                        window[menu].push(arg);
                    });

                    break;
                case 2://移除
                    args.forEach(function(arg) {
                        var position = window[menu].indexOf(arg);
                        if(position >= 0) {
                            window[menu].splice(position, 1);
                        }
                    });
                    break;
                default:
                    window[menu] = args;
            }
            return window[menu];
        },
        setShareClMessage: function(attrs) {//设置车轮车友分享
            window[this.consts.SHARE_CLMESSAGE] = attrs;
        },
        setShareWxTimeline: function(attrs) {//设置微信朋友圈分享
            window[this.consts.SHARE_WXTIMELIN] = attrs;
        },
        setShareWxMessage: function(attrs) {//设置微信好友分享
            window[this.consts.SHARE_WXMESSAGE] = attrs;
        },
        setShareQQ: function(attrs) {//设置QQ分享
            window[this.consts.SHARE_QQ] = attrs;
        },
        setShareSina: function(attrs) {//设置新浪微博分享
            window[this.consts.SHARE_SINA] = attrs;
        },
        setShareSms: function(attrs) {//设置短信分享
            window[this.consts.SHARE_SMS] = attrs;
        },
        setCustomConfig: function(attrs) {//设置自定义配置
            window[this.consts.CUSTOM_CONFIG] = attrs;
        },
        setDissysUrlList: function(urls) {//设置禁止拼系统参数的url配置列表 传入数组
            window[this.consts.DISSYS_URLLIST] = urls;
        }
    };
    return window.chelunApi = _api;
});