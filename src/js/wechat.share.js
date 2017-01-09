var wechatShareData = {
    "imgUrl" : 'http://taobao.uwin-digital.com/img/share.jpg',
    "link" : 'http://taobao.uwin-digital.com/',
    "desc" : '这是一道残忍的计算题，算完所有的游子都哭了……' ,
    "title" : '这是一道关于亲情的计算题'
};

var wechat_share = function (shareData) {
    var data = shareData || wechatShareData ;

    wx.onMenuShareAppMessage({
        desc: data.desc,
        title: data.title,
        link: data.link,
        imgUrl: data.imgUrl,
        dataUrl: '',
        success: function () {
            // ga('send', 'event', '分享', '微信-分享给朋友');
            _hmt.push(['_trackEvent', '分享', ' 微信-分享给朋友',]);

        },
        cancel: function () {
        }
    });

    wx.onMenuShareTimeline({
        desc: data.desc,
        title: data.title,
        link: data.link,
        imgUrl: data.imgUrl,
        success: function () {
            // ga('send', 'event', '分享', '微信-分享到朋友圈');
            _hmt.push(['_trackEvent', '分享', ' 微信-分享到朋友圈',]);

        },
        cancel: function () {
        }
    });

    wx.onMenuShareQQ({
        title: data.title,
        desc: data.desc,
        link: data.link,
        imgUrl: data.imgUrl,
        success: function () {
            // ga('send', 'event', '分享', '微信-分享给 QQ 好友');
            _hmt.push(['_trackEvent', '分享', '微信-分享给 QQ 好友',]);

        },
        cancel: function () {
            // 用户取消分享给QQ好友
        }
    });

    wx.onMenuShareQZone({
        title: data.title,
        desc: data.desc,
        link: data.link,
        imgUrl: data.imgUrl,
        success: function () {
            // ga('send','event', 'button', 'Click','QQzone');
            _hmt.push(['_trackEvent','分享', '微信-分享到 QQ 空间']);
        },
        cancel: function () {
            // 用户取消分享到QQ空间
        }
    });

    wx.onMenuShareWeibo({
        title: data.title,
        desc: data.desc,
        link: data.link,
        imgUrl: data.imgUrl,
        success: function () {
            // ga('send','event', 'button', 'Click','weibo');
            _hmt.push(['_trackEvent','分享', '微信-分享到微博']);
        },
        cancel: function () {
            // 用户取消分享到微博
        }
    });
}


if (/MicroMessenger/i.test(navigator.userAgent)) {
    $.getScript("//res.wx.qq.com/open/js/jweixin-1.0.0.js", function callback() {
        $.ajax({
            type: "get",
            url: "//api.365sy.com/wechat/base.php",
            dataType: 'json',
            data: {url: window.location.href},
            success: function (res) {

                wx.config(res);

                wx.ready(function () {
                    document.getElementById("bg_music").play();
                    wechat_share();
                });
                wx.error(function (res) {
                    console.log(res);
                    //alert('wechat config error');
                })
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //alert("Http status: " + xhr.status + " " + xhr.statusText + "\najaxOptions: " + ajaxOptions + "\nthrownError:" + thrownError + "\n" + xhr.responseText);
            }
        });
    });
}



