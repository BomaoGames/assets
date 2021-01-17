//封面boostrap轮播
// (function ($) {
//     //设置自动轮播和左右触屏滑动
//     function slider() {
//         $('.carousel').carousel({
//             interval: 4000
//         }); //自动轮播
//         var isTouch = ('ontouchstart' in window);
//         if (isTouch) {
//             $(".carousel").on('touchstart', touchMove);
//         }
//     }
//
//     //手指左右滑动
//     function touchMove(e) {
//         var that = $(this);
//         var touch = e.originalEvent.changedTouches[0];
//         var startX = touch.pageX;
//         var startY = touch.pageY;
//         $(document).on('touchmove', function (e) {
//             touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//             var endX = touch.pageX - startX;
//             var endY = touch.pageY - startY;
//             if (Math.abs(endY) < Math.abs(endX)) {
//                 if (endX > 40) {
//                     $(this).off('touchmove');
//                     that.carousel('prev');
//                 } else if (endX < -40) {
//                     $(this).off('touchmove');
//                     that.carousel('next');
//                 }
//                 return false;
//             }
//         });
//         $(document).on('touchend', function () {
//             $(this).off('touchmove');
//         })
//     }
// })(jQuery);

//订阅按钮
// (function ($) {
//     $('.email-btn').click(function () {
//         var reg_email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
//         var email_text = $('.order-input').val();
//
//         if (email_text == '') {
//             $('#email-remind-error strong').text('请输入您的E-Mail电子邮箱地址');
//             $('#email-remind-error').addClass('remind-error');
//         } else {
//             if (!reg_email.test(email_text)) {
//                 $('#email-remind-error strong').text('邮箱格式不正确，请您重新输入');
//                 $('#email-remind-error').addClass('remind-error');
//             } else {
//                 //提交订阅邮箱
//                 var url = '/auth/saveemail';
//                 $.ajax({
//                     url: url,
//                     dataType: 'JSON',
//                     method: 'POST',
//                     data: {email: email_text},
//                     success: function (data) {
//                         if (data) {
//                             switch (data['status']) {
//                                 case 'success' :
//                                     $("#order-email-box").hide();
//                                     $("#order-email-success").show();
//                                     break;
//                                 default:
//                                     $('#email-remind-error strong').text('邮箱只可订阅一次，请勿重复提交，如有疑问请联系在线客服');
//                                     $('#email-remind-error').addClass('remind-error');
//                                     break;
//                             }
//                         }
//                     }
//                 });
//             }
//         }
//     });
//     $('.order-input').bind('input propertychange', function () {
//         $('#email-remind-error').removeClass('remind-error');
//     });
// })(jQuery);

//视频播放
// (function ($) {
//     $('.video-wrap').click(function(){
//         var videoName = $(this).data('video');
//         var so = new SWFObject("/assets/images/video/vcastr2/vcastr2.swf","ply","100%","100%","9","#000000");
//         so.addParam("allowfullscreen","true");
//         so.addParam("allowscriptaccess","always");
//         so.addParam("wmode","opaque");
//         so.addParam("quality","high");
//         so.addParam("salign","lt");
//         so.addVariable("vcastr_config", "1|0|100|0|0|0x000033|60|0x66ff00|0xffffff|0xffffff||/assets/images/login-v5/logo-new.png||1");
//         so.addVariable("vcastr_file",videoName);
//         $('#modal-video').html(so.getSWFHTML());
//     });
// })(jQuery);

//分页加载js
(function ($) {
    $('img').lazyload();
})(jQuery);

//首页右上角下拉效果
(function ($) {
    $('.down-center').hover(function () {
        $(this).find('.down-drop').stop(true, false).fadeIn(400);
        $(this).find('.down-menu').addClass('down-menu-hov');
    }, function () {
        $(this).find('.down-drop').stop(true, false).fadeOut(400);
        $(this).find('.down-menu').removeClass('down-menu-hov');
    })
})(jQuery);

//发展历程的移动效果
(function () {
    var oWrap = $('.move-wrap'),
        oList = oWrap.find('.box'),
        oYear = oWrap.find('.move-year'),
        oEvent = oWrap.find('.move-event'),
        arrowPrev = $('.move-arrow .prev'),
        arrowNext = $('.move-arrow .next'),
        oWidth = oEvent.eq(0).width(),
        wrapWidth = 0,
        move_t = 400,
        delay_t = 100,
        year_i = oWrap.find('.move-date').length - 1;

    oList.each(function () {
        wrapWidth += $(this).width();
    });

    oWrap.css('marginLeft', -wrapWidth + oWidth);

    //初始定位到每年的最后一个（有内容的）月份
    function yearInit() {
        oWrap.find('.move-date').each(function () {
            var oLi = $(this).find('.move-li'),
                len = oLi.length;
            for(var i=len-1; i>=0; i--){
                if(oLi.eq(i).find('.move-event').length === 1){
                    $(this).find('.move-year').animate({'left': i*oWidth},move_t);
                    break;
                }
            }
        });
    }
    yearInit();

    oEvent.click(function () {
        var i = oWrap.find('.move-li').index($(this).parent('.move-li')),
            n = $(this).parent('.move-li').index(),
            thisYear = $(this).parents('.move-list').prev('.move-year');

        //重置year_i
        year_i = oWrap.find('.move-date').index($(this).parents('.move-list').prev().parent());
        //设置箭头样式
        if(year_i === 0){
            arrowPrev.addClass('arrow-disabled');
        }else{
            arrowPrev.removeClass('arrow-disabled');
        }
        if(year_i === oWrap.find('.move-date').length - 1){
            arrowNext.addClass('arrow-disabled');
        }else{
            arrowNext.removeClass('arrow-disabled');
        }

        //给当前月份添加样式
        oEvent.parent().removeClass('move-active');
        $(this).parent().addClass('move-active');

        //给当前年份添加样式
        oYear.removeClass('move-cur');
        thisYear.addClass('move-cur');

        //给当前年份添加动画，给oWrap设置marginLeft值并添加动画
        oWrap.delay(delay_t).animate({marginLeft: -i * oWidth}, move_t);
        thisYear.delay(delay_t).animate({left: n * oWidth}, move_t);
    });

    arrowPrev.click(function () {
        if($(this).hasClass('arrow-disabled')) return false;
        yearInit();
        arrowNext.removeClass('arrow-disabled');
        year_i--;
        if(year_i === 0){
            $(this).addClass('arrow-disabled');
        }
        prevNext(year_i);
    });

    arrowNext.click(function () {
        if($(this).hasClass('arrow-disabled')) return false;
        yearInit();
        arrowPrev.removeClass('arrow-disabled');
        year_i++;
        if(year_i === oWrap.find('.move-date').length - 1){
            $(this).addClass('arrow-disabled');
        }
        prevNext(year_i);
    });

    function prevNext() {
        var oDate = oWrap.find('.move-date').eq(year_i),
            oLi = oDate.find('.move-li'),
            len = oLi.length;

        oWrap.find('.move-li').removeClass('move-active');
        for(var m=len-1; m>=0; m--){
            if(oLi.eq(m).find('.move-event').length === 1){
                oDate.find('.move-li').eq(m).addClass('move-active');
                break;
            }
        }

        oYear.removeClass('move-cur');
        oDate.find('.move-year').addClass('move-cur');

        var i = oWrap.find('.move-li').index(oWrap.find('.move-active'));
        oWrap.delay(delay_t).animate({marginLeft: -i * oWidth}, move_t);
    }
})(jQuery);

//登录第一页的效果
(function ($) {
    var oBody = $('body'),
        oEnter = $('.enter .common-btn'),
        oArrow = $('.arrow-d'),
        oNav = $('.top-nav'),
        oBtn = $('.nav-btn'),
        oCon = $('.nav-con'),
        oWrap = $('.nav-wrap'),
        oClose = $('.nav-close'),
        oHeight = document.documentElement.clientHeight;
    $(window).resize(function () {
        oHeight = document.documentElement.clientHeight;
    });
    //点击向下的箭头
    oArrow.click(function () {
        $('html,body').animate({'scrollTop': oHeight}, 400);
    });
    //点击进入按钮
    oEnter.click(function () {
        $('.top-slide').addClass('top-slide-c');
    });
    //点击左上角的按钮，让phone-con出来
    oBtn.click(function () {
        oCon.fadeIn(200);
        oWrap.addClass('nav-wrap-c');
        oNav.addClass('top-nav-c');
    });
    //点击关闭按钮，让phone-con关闭
    oClose.click(function () {
        oCon.fadeOut(200);
        oWrap.removeClass('nav-wrap-c');
        oNav.removeClass('top-nav-c');
    });

    //页面往下滚动，头部颜色变黑
    $(window).scroll(function () {
        var top = oBody.scrollTop();
        if (top < 140) {
            $('.top-nav').css('background', 'rgba(0,0,0,' + top / 150 + ')');
        }
    });
})(jQuery);

//左右切换轮播
(function ($) {
    if (navigator.userAgent.indexOf("MSIE 8.0") < 0) {        //如果为ie8就不能加载js
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/js/swiper.min.js').then(function () {  //动态加载js文件
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 3,
                spaceBetween: 20,
                breakpoints: {
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
                }
            });
        })
    }
})(jQuery);


//试玩弹框提示
(function ($) {
    $('#try-play').click(function () {
        if (0) {
            $('#System-maintenance').modal('show');
        } else {
            $('#service-term').modal('show');
        }
    });
})(jQuery);

