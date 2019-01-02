;(function(){
    var querystring = {
        parse: function(string) {
            var parsed = {};
            string = (string !== undefined) ? string : window.location.search;

            if (typeof string === "string" && string.length > 0) {
                if (string[0] === '?') {
                    string = string.substring(1);
                }

                string = string.split('&');

                for (var i = 0, length = string.length; i < length; i++) {
                    var element = string[i],
                        eqPos = element.indexOf('='),
                        keyValue, elValue;

                    if (eqPos >= 0) {
                        keyValue = element.substr(0, eqPos);
                        elValue = element.substr(eqPos + 1);
                    } else {
                        keyValue = element;
                        elValue = '';
                    }

                    elValue = decodeURIComponent(elValue);

                    if (parsed[keyValue] === undefined) {
                        parsed[keyValue] = elValue;
                    } else if (parsed[keyValue] instanceof Array) {
                        parsed[keyValue].push(elValue);
                    } else {
                        parsed[keyValue] = [parsed[keyValue], elValue];
                    }
                }
            }

            return parsed;
        },
        stringify: function(obj) {
            var string = [];

            if (!!obj && obj.constructor === Object) {
                for (var prop in obj) {
                    if (obj[prop] instanceof Array) {
                        for (var i = 0, length = obj[prop].length; i < length; i++) {
                            string.push([encodeURIComponent(prop), encodeURIComponent(obj[prop][i])].join('='));
                        }
                    } else {
                        string.push([encodeURIComponent(prop), encodeURIComponent(obj[prop])].join('='));
                    }
                }
            }

            return string.join('&');
        }
    };

    window['CHELUN_SHOW_OPTION_MENU'] = 1;
    /*
     window['CHELUN_SHOW_MENU_ITEMS'] = ['menu:share:clMessage',
     'menu:share:wxMessage',
     'menu:share:wxTimeline',
     'menu:share:qq',
     'menu:share:sina',
     'menu:share:sms',
     'menu:copyUrl',
     'menu:openWithBrowser',
     'menu:refresh' ];

     //分享给车轮好友的内容
     window['CHELUN_SHARE_DATA_CLMESSAGE'] = {
     title: '分享给车轮好友标题', // 分享标题
     desc: '分享给车轮好友的内容', // 分享描述
     link: 'http://www.baidu.com?CHELUN_SHARE_DATA_CLMESSAGE', // 分享链接
     imgUrl: 'http://img.sootuu.com/vector/2006-4/small_2006419175725626.jpg', // 分享图标
     type: '', // 分享类型,music、video或link，不填默认为link
     dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
     };

     //分享到微信朋友圈的内容
     window['CHELUN_SHARE_DATA_WXTIMELINE'] = {
     title:'分享到微信朋友圈标题',//分享标题
     link: 'http://www.baidu.com?CHELUN_SHARE_DATA_WXTIMELINE', // 分享链接
     imgUrl: 'http://img.sootuu.com/vector/2006-4/small_2006419175725626.jpg' // 分享图标
     };
     //发送给微信好友的内容
     window['CHELUN_SHARE_DATA_WXMESSAGE'] = {
     title: '发送给微信好友的标题', // 分享标题
     desc: '发送给微信好友的描述', // 分享描述
     link: 'http://www.baidu.com?CHELUN_SHARE_DATA_WXMESSAGE', // 分享链接
     imgUrl: 'http://img.sootuu.com/vector/2006-4/small_2006419175725626.jpg', // 分享图标
     type: '', // 分享类型,music、video或link，不填默认为link
     dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
     };
     //分享到QQ的内容
     window['CHELUN_SHARE_DATA_QQ'] = {
     title: '分享到QQ的标题', // 分享标题
     desc: '分享到QQ的描述', // 分享描述
     link: 'http://www.baidu.com?CHELUN_SHARE_DATA_QQ', // 分享链接
     imgUrl: 'http://img.sootuu.com/vector/2006-4/small_2006419175725626.jpg' // 分享图标
     };
     //分享到新浪微博的内容
     window['CHELUN_SHARE_DATA_SINA'] = {
     title: '分享到新浪微博的标题', // 分享标题
     desc: '分享到新浪微博的内容描述', // 分享描述
     link: 'http://www.baidu.com?CHELUN_SHARE_DATA_SINA', // 分享链接
     imgUrl: 'http://img.sootuu.com/vector/2006-4/small_2006419175725626.jpg' // 分享图标
     };
     //分享到新浪微博的内容
     window['CHELUN_SHARE_DATA_SMS'] = {
     title: '短信短信内容CHELUN_SHARE_DATA_SMS' // 短信内容
     };
     */
    var extend = function (target, source) {

        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }

        return target;
    };



    var _api = {

        __RETURN_VALUE: undefined,
        __globalFuncIndex: 0,
        //创建iframe请求
        _openURL: function(url){
            var i = document.createElement('iframe');
            i.style.display = 'none';
            i.onload = function() { i.parentNode.removeChild(i); };
            i.src = url;
            document.body.appendChild(i);

            //read return value
            var returnValue = _api.__RETURN_VALUE;
            _api.__RETURN_VALUE = undefined;
            return returnValue;
        },
        //调用协议
        /*
         车轮版协议：    chelunJSBridge://模块名/功能?参数#序列号 {}
         */
        _invokeClientMethod: function(module, name, parameters){
            var par = parameters || {}, vtr = '';
            par = _api._formatArguments(par);
            if('__callBackTag__' in par){
                var _n = parseFloat(par['__callBackTag__'].replace('__MCL_CALLBACK_',''));
                vtr = '#' + _n;
                delete par['__callBackTag__'];
            };
            var url = 'chelunJSBridge://' + module + '/' + name + '?' + querystring.stringify(par) + vtr;
            console.log('[API]' + url);
            var r = _api._openURL(url);
            return r ? r.result : null;
        },

        _createGlobalFuncForCallback: function(callback){
            if (callback) {
                var name = '__MCL_CALLBACK_' + (_api.__globalFuncIndex++)
                window[name] = function(){
                    var args = arguments;
                    var func = (typeof callback == "function") ? callback : window[callback];
                    //we need to use setimeout here to avoid ui thread being frezzen
                    setTimeout(function(){ func.apply(null, args); }, 0);
                };
                return name;
            }
            return null;
        },
        _formatArguments:function(arg){
            if(!arg) return {} ;
            var obj = {};
            for(var i in arg){
                if(typeof arg[i] == 'function'){ //函数都放这里生成新的函数
                    var _name = _api._createGlobalFuncForCallback(arg[i]);

                    if(i == 'callback'){ //改个key是为了放在 # 后面
                        obj['__callBackTag__'] = _name;
                        delete obj[i];
                    }else{
                        obj[i] = _name.replace('__MCL_CALLBACK_','');
                    };
                }else{
                    obj[i] = arg[i];
                }
            };

            return obj;
        },
        //获取ua信息
        getua : function(){
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
        //获取cookie
        cookie:function(args){
            var len = arguments.length,
                ck = document.cookie;
            if(len === 0){
                return ck;
            };
            if(len === 1){
                var name = args + "=";
                var ca = ck.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                }
            };
        },
        //隐藏右上角
        hideMenu:function(){
            window['CHELUN_SHOW_OPTION_MENU'] = 0;
        },
        showMenu:function(){
            window['CHELUN_SHOW_OPTION_MENU'] = 1;
        },
        //设置分享的文案信息
        setShareData:function(key,arg){
            if(window[key]){
                var obj = extend(window[key],arg);
            }else{
                var obj = arg;
            }
            return window[key] = obj;
        },
        //添加显示目录的按钮
        addShowMenu:function(arg){
            if(window['CHELUN_SHOW_MENU_ITEMS']){
                var str = '',
                    n = window['CHELUN_SHOW_MENU_ITEMS'].join(',');
            }else{
                var n = [];
                window['CHELUN_SHOW_MENU_ITEMS'] = [];
            }
            if(!arg || n.indexOf(arg) > -1) return;

            window['CHELUN_SHOW_MENU_ITEMS'].push(arg);

            return window['CHELUN_SHOW_MENU_ITEMS'];
        },
        app:{
            login:function(args){
                return _api._invokeClientMethod('app', 'login', args );
            },
            isAppInstalled:function(args){
                return _api._invokeClientMethod('app', 'isAppInstalled',args);
            },
            launchApp:function(args){
                return _api._invokeClientMethod('app', 'launchApp',args);
            }
        },
        /*
         'chelunJSBridge://ui/shareMessage?to=clMessage' //发送给车轮好友
         'chelunJSBridge://ui/shareMessage?to=wxTimeLINE' //分享到朋友圈
         'chelunJSBridge://ui/shareMessage?to=wxMessage' //发送给微信好友
         'chelunJSBridge://ui/shareMessage?to=qq' //分享到QQ
         'chelunJSBridge://ui/shareMessage?to=sina' //分享到新浪微博
         'chelunJSBridge://ui/shareMessage?to=sms' //发短信
         */
        share:function(args){

            return _api._invokeClientMethod('ui', 'shareMessage',args);
        },
        ui:{
            openWithBrowser:function(args){

                return _api._invokeClientMethod('ui', 'openWithBrowser',args);
            },
            refresh:function(args){

                return _api._invokeClientMethod('ui', 'refresh',args);
            },
            bindWeixin:function(args){

                return _api._invokeClientMethod('ui', 'bindWeixin',args);
            },
            bindPhone:function(args){

                return _api._invokeClientMethod('ui', 'bindPhone',args);
            },
            scanQRCode:function(args){
                return _api._invokeClientMethod('ui', 'scanQRCode',args);
            },
            copy:function(args){
                return _api._invokeClientMethod('ui', 'copy',args);
            }
        },
        data:{
            hadBoundWeixin:function(args){

                return _api._invokeClientMethod('data', 'hadBoundWeixin',args);
            },
            hadBoundPhone:function(args){

                return _api._invokeClientMethod('data', 'hadBoundPhone',args);
            }
        },
        device:{
            chooseImage:function(args){
                return _api._invokeClientMethod('device', 'chooseImage',args);
            },
            getLocation:function(args){
                return _api._invokeClientMethod('device', 'getLocation',args);
            }
        },
        cwz:{
            hadEncounteredViolation:function(args){
                return _api._invokeClientMethod('cwz', 'hadEncounteredViolation',args);
            },
            addCar:function(args){
                return _api._invokeClientMethod('cwz', 'addCar',args);
            },
            fetchCarList:function(args){
                return _api._invokeClientMethod('cwz', 'fetchCarList',args);
            }
        }
    };
    window.cl_api = _api;

})();
