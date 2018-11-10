MpSdk.Util = {

    // 获取游览器 user Agent
    isWeixin: function () {
        var ua = navigator.userAgent.toLowerCase();
        
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    //获取设备
    getDevice: function(){//0-- 安卓版  1-- ios版 2--PC端 -1-- 非安卓、非ios版
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/android/i) == "android") { return 0; }
        else {
            if (ua.match(/iphone os/i) == "iphone os") { return 1; }
            else {
                if (ua.match(/windows/i) == "windows") { return 2; }
                else { return -1; }               
            }
        }
        
    },

    // 提示信息
    dialogInfo: function () {
        $('.btn_down').on('touchstart', function (ev) {
            ev.stopPropagation();
            $('.shae_dialog').css('display', 'block');
        });

        $(document).on('touchstart', function () {
            $('.shae_dialog').css('display', 'none');
        });
    },

    dialogInfoutil: function (classname) {
        var that = this;
        if (that.isWeixin()) {
            $(classname).on('touchstart', function (ev) {
                ev.stopPropagation();
                if (that.getDevice() == 1) {
                    if (classname == ".downLoad") {
                        $('body').dialogios();
                    }
                    else { alert("IOS版即将上线，敬请期待！"); }
                }
                else {
                    //if (MpSdk.Util.getDevice() == 0) { $('body').dialog(); }
                    if (that.getDevice() == 1) {
                        $('body').dialog("/images/shade/btn_back_03.png");
                        return;
                    }
                    $('body').dialog();
                }
               
            });
            $(document).on('touchstart', function () {
                $('body').closed();
            });
        }
        else {
            if (classname == ".downLoad") {
                var typedown=0;
                $(classname).on('touchstart', function (ev) {
                    ev.stopPropagation();
                    //alert("type2");
                    if (that.getDevice() == 2) { typedown = 6;}
                    else { typedown = 2; }
                    $.ajax({
                        url: '/Handler/HdFaceDownloadCount.ashx',
                        type: 'Get',
                        data: { Type: typedown ,openid:""},//2--安卓浏览器点击下载 6--PC端浏览器点击下载
                        success: function (data) {
                            //alert(data);
                        }
                    });

                });
            }
            
        }
    },

    // 访问统计　type = 0;//0--微信访问 1-安卓访问 2-安卓点击下载 3-微信分享 4-IOS分享  5-PC访问 6-PC点击下载
    logfacedown: function (type) {
        $.ajax({
            url: '/Handler/HdFaceDownloadCount.ashx',
            type: 'Get',
            data: { Type: type,openid:"" },
            success: function (data) {
                //alert(data);
            }
        });
    },
    logdownsum: function (type, code) {
        $.ajax({
            url: '/Handler/HdFaceDownloadCount.ashx',
            type: 'Get',
            data: { Type: type, openid: code },
            success: function (data) {
                //alert(data);
            }
        });
    },
    // 获取URL参数值
    resolveUrlParam: function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }

        return theRequest;
    },

    // jQuery Mobile Loading Bug
    fixMobileLoading: function () {
        $.mobile.loading('show', {
            text: '',
            textVisible: false,
            theme: 'z', html: ""
        });
    },
    
    // 判断设置类型，匹配弹出层图片
    //changeImg: function (i_id) {
    //    if (this.getDevice() == 1)
    //        $("#" + i_id).css("background-image", "url(/images/share/btn_select_05.png)");
    //}

    //是否关注
    isAttention: function () {
        var Request = new Object();
        Request = MpSdk.Util.resolveUrlParam();
        var that = this;
        $.ajax({
            url: '/Handler/HdAttention.ashx',
            type: 'Get',
            data: { nowOpenId: Request["nowOpenId"] },
            success: function (attention) {
                var isBlag = attention;
                var _appKey = Request["CardAppkey"];
                var _cardType = Request["CardType"];
                var cookieName = _appKey + "_" + _cardType;
                if ($.cookie(cookieName) == null || isBlag == "isfalse") {
                    if (that.getDevice() == 1) {
                        if (isBlag == "istrue") {
                            $('body').sharedialog('/images/share/btn_select_05.png', false);
                        }
                        else {
                            $('body').sharedialog('/images/share/btn_select_05.png', true);
                        }
                    }
                    else {
                        if (isBlag == "istrue") {
                            $('body').sharedialog(false, false);
                        }
                        else {
                            $('body').sharedialog(false, true);
                        }
                    }
                }

                return isBlag;
            }
        });

    },

    ///清空礼包cookie
    deleteCookieCount: function () {
        var Request = new Object();
        Request = MpSdk.Util.resolveUrlParam();
        var _appKey = Request["CardAppkey"];
        var _cardType = Request["CardType"];
        var cookieName = _appKey + "_" + _cardType;    //cookieName 页面处理的cookieName
        var count;
        $.cookie(cookieName, null);

        return count;
    }



};