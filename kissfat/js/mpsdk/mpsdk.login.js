MpSdk.Login= {
    bindweixin: function (statenode) {
        /*
       statenode 0--登陆  1--注册 登陆
       code 微信号兑换码  0--未获得code
       */

        // $.cookie('loginstate', 'success', { expires: 1, path: 'TaojinCenter.aspx' });
        //var regs = /^[A-Za-z0-9]+$/g;//数字、字母及其组合
        //alert(regs.test($(".textName").val()))
        //if (!regs.test($(".textName").val())) {
        //    alert("用户名应该为数字字母下滑线组合 ");
        //}    
        if ($(".textName").val() == "") {
            alert("请输入账号!");
            this.CssTextname();
        }
        else {
            if ($(".textPassword").val() == "") {
                alert("请输入密码!");
                this.CssTextpwd();
            }

            else {
                var re = /(?!^\d+$)(?!^[a-zA-Z]+$)^[0-9a-zA-Z]{6,20}$/
                if (!re.test($(".textName").val()) || !re.test($(".textPassword").val())) {
                    alert('请输入6-20位数字和字母组合');
                } else {
                    this.LoadData(statenode, $(".textName").val());
                }

            }

            //else {
            //    if (escape($(".textName").val()).indexOf("%u") != -1 || escape($(".textPassword").val()).indexOf("%u") != -1) {  //是否有汉字  
            //        alert("用户名或密码格式错误:6-20 位数字和字母组合！");
            //        this.CssTextname();
            //    }
            //    else {
            //        if ($(".textName").val().length < 6 || $(".textName").val().length > 20) { //字符串长度
            //            alert("用户名格式错误：6-20 位数字和字母组合");
            //            this.CssTextname();
            //        }
            //        else {
            //            if ($(".textPassword").val().length < 6 || $(".textPassword").val().length > 20) {
            //                alert("密码格式错误：6-20 位数字和字母组合");
            //                this.CssTextpwd();
            //            }
            //            else { this.LoadData(statenode, $(".textName").val()); }
            //        }
                  
            //    }
             
            //}
        }

    },
    CssTextname:function(){
        $(".textName").focus();
        $('.textPassword').parent().removeClass('hover');
        $('.textPassword').parent().addClass('border');
        $('.textName').parent().removeClass('border');
        $('.textName').parent().addClass('hover');
    },
    CssTextpwd: function () {
        $(".textPassword").focus();
        $('.textName').parent().removeClass('hover');
        $('.textName').parent().addClass('border');

        $('.textPassword').parent().removeClass('border');
        $('.textPassword').parent().addClass('hover');
    },
    LoadData: function (statenode, textnamevalue) {
        //alert(textnamevalue);
        //$.cookie('loginstate', 'success_' + $(".textName").val(), { expires: 1, path: '/login' });//cookie记录登陆状态
        //alert("cookie=" + $.cookie('loginstate'));
        $('body').loading();
        //if (statenode == 1) { $('body').closed(); }
        if (statenode == 0 || statenode == 1)  {
            $.ajax({
                url: '/Handler/HdBindWeixin.ashx',
                type: 'Post',
                data: { TextName: $(".textName").val(), TestPassword: $(".textPassword").val(), state: statenode, code: code },
                success: function (data) {
                    //alert("绑定结果 data=" + data);
                    //alert(textnamevalue);
                    //$.cookie('loginstate', 'success_' + textnamevalue, { expires: 1, path: '/login' });//cookie记录登陆状态
                    //alert("cookie=" + $.cookie('loginstate'));
                    //alert(textnamevalue);
                    $('body').closed();
                    switch (data) {
                        case "-55":
                            alert("你的微信账号已绑定过飞淘账号！");
                            break;
                        case "-7":
                            alert("账号已存在！");
                            break;
                        case "-24":
                            alert("无效的账号或密码！");
                            break;
                        case "-28":
                            alert("账号不存在！");
                            break;
                        case "-0":
                            alert("访问数据库出错！");
                            break;
                    }
                    if (data == "-6") alert("账号或密码错误！");
                    if (data == "1") {
                        //alert("存cookie");
                        $.cookie('loginstate', 'success_' + $(".textName").val(), { expires: 1, path: '/' });//cookie记录登陆状态  path: '/login'
                        $.cookie('loginpwd', 'success_' + $(".textPassword").val(), { expires: 1, path: '/' });//cookie记录登陆状态  path: '/login'
                        //alert("cookielogin=" + $.cookie('loginstate'));
                        //alert("cookiepwd=" + $.cookie('loginpwd'));
                        $(".warp").load('SuccessBind.html');
                        
                    }
                }

            });
        }
        else { alert("页面加载出错statenode=:" + statenode) }
    },   
    touchevent: function () {
        $('.textName').on('touchstart', function () {
            $('.textPassword').parent().removeClass('hover');
            $('.textPassword').parent().addClass('border');

            $('.textName').parent().removeClass('border');
            $('.textName').parent().addClass('hover');
        });
        $('.textPassword').on('touchstart', function () {
            $('.textName').parent().removeClass('hover');
            $('.textName').parent().addClass('border');

            $('.textPassword').parent().removeClass('border');
            $('.textPassword').parent().addClass('hover');
        });

    },
    textconfine: function (){
        var re = /(?!^\d+$)(?!^[a-zA-Z]+$)^[0-9a-zA-Z]{6,20}$/;
        var reg = /[0-9a-zA-Z]/g;
        var regs = /[^0-9a-zA-Z]/g;
        $('input').val('');
        $('input').on('input', function () {
            var length = $(this).val().length;
            if (length > 20) {
                $(this).val($(this).val().substring(0, 20)) ;
            }
            $(this).val($(this).val().replace(regs, '')) ;
        });
        
    }


}