(function () {
    var statusList = [0, 0];
    $("body").loading();
    $.ajax({
        url: '/Handler/HdUserCenterGold.ashx',
        type: 'Get',
        data: { username: UserName ,pwd:Pwd},
        success: function (data) {
            if (data == "-1")
            { alert("获取胖币失败！"); }
            else {
                var gold = data.split('&');//gold[0] 胖子amount  gold[1] 面子pie
                $("#goldpie").text(gold[1]);
                $("#goldamount").text(gold[0]);
            }
            statusList[0] = 1;
            if (statusList[0] == 1 && statusList[1] == 1) {
                // 取消遮罩
                //alert("取消遮罩");
                $('body').closed();
            }
        }
    });

    $.ajax({
        url: '/Handler/HdUserCenterNote.ashx',
        type: 'Get',
        data: { username: UserName},
        success: function (data) {
            
            statusList[1] = 1;
            $(".number").text(data);


            if (statusList[0] == 1 && statusList[1] == 1) {
                // 取消遮罩
                //alert("取消遮罩");
                $('body').closed();
            }
        }
    });


}());