MpSdk.Gift = {

    //分享后获取礼包页面使用，第一次返回null，每次调用cookie值+1 分享礼包页面使用，URL参数中必须带有CardAppkey、CardType
    getCookieCount: function () {
        var Request = new Object();
        Request = MpSdk.Util.resolveUrlParam();
        var _appKey = Request["CardAppkey"];
        var _cardType = Request["CardType"];
        var cookieName = _appKey + "_" + _cardType;    //cookieName 页面处理的cookieName
        var count;

        if ($.cookie(cookieName) == null) {
            $.cookie(cookieName, 1, { path: "/" });
            count = 1;
        } else {
            count = $.cookie(cookieName) * 1;
            $.cookie(cookieName, count + 1, { path: "/" });
        }


        return count;
    },

    ///分享获取礼包逻辑处理
    ///cookieName 页面处理的cookieName
    ///control_1 第一次打开页面时显示的控件ID
    ///control_2 第二次打开页面时显示的控件ID
    ///control_3 已领取过礼包时显示的控件ID
    ///control_message 显示提示信息的控件ID
    ///txtCardCode 显示礼包卡号的文件框ID
    ///领取礼包的按钮ID
    getGiftCardCode: function (control_1, control_2, control_3, control_message, butid) {
        var that = this;
        var Request = new Object();
        Request = MpSdk.Util.resolveUrlParam();
        var _appKey = Request["CardAppkey"];
        var _cardType = Request["CardType"];
        var cookieName = _appKey + "_" + _cardType;    //cookieName 页面处理的cookieName
        
        var count = $.cookie(cookieName);
        if (count == 1) {
            $("#" + control_1).hide();
            $("#" + control_2).show();
            $("#" + control_message).hide();
        } else if (count > 1) {
            if ($.cookie(cookieName + "cardNo") == null) {
                $("#" + control_1).hide();
                $("#" + control_2).hide();
                $("#" + control_3).show();
            } else {
                $("#" + butid).off("click");
                $("#" + control_1).hide();
                $("#" + control_2).hide();
                $("#" + control_message).show();
                $("#" + control_message).text("您的卡号：[" + $.cookie(cookieName + "cardNo") + "]");
            }
        }
    },

    ///分享获取礼包逻辑处理
    ///control_1 第一次打开页面时显示的控件ID
    ///control_2 第二次打开页面时显示的控件ID
    ///control_3 已领取过礼包时显示的控件ID
    ///control_message 显示提示信息的控件ID
    ///领取礼包的按钮ID
    ///提示关注div块的ID
    getGiftCard: function (control_1, control_2, control_3, control_message, butid, attention) {
       
        $("#" + butid).off("click");
        $('body').loading();

        var Request = new Object();
        Request = MpSdk.Util.resolveUrlParam();

        var _appKey = Request["CardAppkey"];
        var _cardType = Request["CardType"];
        var cookieName = _appKey + "_" + _cardType;    //cookieName 页面处理的cookieName
        $.ajax({
            type: "post",
            url: "/Handler/HdGetGiftCard.ashx",
            data: "actionType=getGift&appKey=" + _appKey + "&cardtype=" + _cardType + "&nowOpenId=" + Request["nowOpenId"] + "&prevOpenId=" + Request["prevOpenId"],
            dataType: "json",
            success: function (result) {
                if (result == null) {
                    $("#" + control_1).hide();
                    $("#" + control_2).hide();
                    $("#" + control_message).show();
                    $("#" + control_message).text("对不起，服务器出错，请稍后再试！");
                    
                    $('body').closed();
                } else {
                    if (result.code == 11) {
                        $("#" + control_1).hide();
                        $("#" + control_2).hide();
                        //$("#" + control_message).show();
                        $("#" + control_3).show();
                        MpSdk.Gift.getCookieCount();
                        $.cookie(cookieName + "cardNo", result.data.cardNo, { path: "/" })

                        $('body').closed();
                        //if (result.data.cardPwd != null && result.data.cardPwd != "") {
                        //    $("#" + control_message).text("您的卡号：[" + result.data.cardNo + "]  密码：[" + resul.data.cardPwd + "]");
                        //} else {
                        //    $("#" + control_message).text("您的卡号：[" + result.data.cardNo + "]");
                        //}
                    }
                    else if (result.code == -12) {   //用户未关注飞淘
                        $("#" + control_1).hide();
                        $("#" + control_2).hide();
                        $("#" + control_3).hide();
                        $("#" + attention).show();
                        // $("#cover").hide();
                        $('body').closed();
                    } else {
                        $("#" + control_1).hide();
                        $("#" + control_2).hide();
                        $("#" + control_3).hide();
                        $("#" + control_message).show();
                        //$("#" + control_message).text("对不起，服务器出错，请稍后再试！");
                        $("#" + control_message).text(result.msg);

                        // $("#cover").hide();
                        $('body').closed();
                    }
                }
            }, error: function (result) {
                $("#" + control_1).hide();
                $("#" + control_2).hide();
                $("#" + control_3).hide();
                $("#" + control_message).show();
                $("#" + control_message).text(result.msg);
                //$("#cover").hide();
                $('body').closed();
            }
        });
    }
};

