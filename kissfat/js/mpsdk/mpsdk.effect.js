MpSdk.Effect = {
    // 图片左右滑动
    imgSlide: function () {
        var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0,
        slideCount = $('.slideimg img').length;
        $('.container').live('mousedown touchstart', slideStart);
        $('.container').live('mouseup mousestop touchend', slideEnd);
        $('.container').live('mousemove mousedown touchmove', slide);
        $('.container .pad').live('mousemove mousedown touchmove', slideEnd);

        function slideStart(event) {
            if (event.originalEvent.touches)
                event = event.originalEvent.touches[0];
            if (sliding == 0) {
                sliding = 1;
                startClientX = event.clientX;
            }
        }

        function slide(event) {
            event.preventDefault();
            if (event.originalEvent.touches)
                event = event.originalEvent.touches[0];
            var deltaSlide = event.clientX - startClientX;
            if (sliding == 1 && deltaSlide != 0) {
                sliding = 2;
                startPixelOffset = pixelOffset;
            }
            if (sliding == 2) {
                var touchPixelRatio = 1;
                if ((currentSlide == 0 && event.clientX > startClientX) || (currentSlide == slideCount - 1 && event.clientX < startClientX))
                    touchPixelRatio = 3;
                pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
                $(".slideimg").css('left', pixelOffset + 'px');
            }
        }

        function slideEnd(event) {
            if (sliding == 2) {
                sliding = 0;
                currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
                currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
                pixelOffset = currentSlide * -$('.slideimg img').width();

                $(".slideimg").animate({ left: pixelOffset }, 250);
            }
        }
    },

    // 图片放大
    bigImage: function () {
        //var imgobj = null;
        //$('.slideimg img').on("click", function () {
        //    if (imgobj) {
        //        imgobj.remove();
        //    }
        //    var elem = $('<img>');//创建一个img标签
        //    imgobj = elem;
        //    elem.attr('src', this.src)
        //    elem.addClass("overlay");
        //    elem.hide();
        //    $(document.body).append(elem);
        //    elem.show(1000);
        //    $(".fullscreen").show();
        //    $(".fullscreen").on('click', function () {
        //        elem.hide();
        //        elem.remove();
        //        $(this).hide();
        //    })
        //    elem.on('click', function () {
        //        elem.hide();
        //        elem.remove();
        //    })
        //})
        var imgobj = null;
        var sw = document.documentElement.scrollWidth;
        var sh = document.documentElement.scrollHeight;
            $('.slideimg img').on("click", function () {
                if (imgobj) {
                    imgobj.remove();
                };
                var elem = $('<div>');
                imgobj = elem;
                elem.addClass("cloneImg");
                elem.css('background-image', 'url(' + this.src + ')');
                $(document.body).append(elem);
                elem.animate({ width: sw, height: sh, marginLeft: (-sw / 2), marginTop: (-sh / 2) }, 1000)
                elem.on('click', function () {
                    elem.hide();
                    elem.remove();
                })
            })
    },

    // 图片列表处理
    imgListDeal: function (imglist) {
        //var img_str = new Object();
        img_str = imglist.split(";");
        var strlist = "";

        for (var i = 0; i < img_str.length; i++) {
            strlist += "<a href=\"weixin://viewimage/" + img_str[i] + "\" class='images'>" + "<img src=\"" + img_str[i] + "\" /></a>";
        }

        $("div .slideimg").html(strlist);
    },
    //下拉隐藏列表
    cssslide: function () {
        var lis = $('.getMainzi .slide').get();
        var obj = null;
        for (var i = 0; i < lis.length; i++) {
            (function (i) {
                var flag = false;
                lis[i].onclick = function () {
                    var that = this;
                    if (obj != this) {
                        for (var j = 0; j < lis.length; j++) {
                            (function (j) {
                                if (obj != this) {
                                    flag = false;
                                    $(lis[j]).parent().siblings().slideUp();
                                    $(lis[j]).find('i').removeClass('slideDown');
                                }
                            })(j);
                        }
                    };
                    obj = this;
                    if (flag) {
                        $(this).parent().siblings().slideUp();
                        $(this).children().removeClass('slideDown');
                        flag = false;
                    } else {
                        $(this).parent().siblings().slideDown();
                        $(this).children().addClass('slideDown');
                        flag = true;
                    };
                }
            })(i);
        };
    }
    

};