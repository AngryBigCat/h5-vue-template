var localhost = location.href;
if (localhost.indexOf("?") != -1) {
  localhost = localhost.split("?")[0];
}
localhost = localhost.replace(/index\.(html|php)$/, "");

$.ajax({
  type: 'GET',
  url: localhost + '/share.php?url=' + encodeURIComponent(location.href),
  success: function success(res) {
    var data = JSON.parse(res);
/*
    var logoimg = _.shuffle(['img/logo2.jpg']);
    var textArr = _.shuffle(['又一个春风十里，是你陪伴我走过1/4个世纪', '在我生命里有颗闪耀的星，与我星影不离1/4个世纪']);*/

    var shareOption = {
      title: '金山好人公园智慧导览平台',
      desc: '一言一语 一花一木 皆显文明',
      link: localhost,
      imgUrl: localhost + '/static/img/logo.png',
      success: function success() {
        /*$.ajax({
            url: 'server.php?a=checkUserShare',
            type: 'GET',
            success: function (data) {
              data = JSON.parse(data);
              if (data.code == 3) {
                console.log(data.msg);
              } else if (data.code == 2) {
                //已上传
                  mySwiper.slideTo(5);
                console.log(data.msg);
              } else if (data.code == 1) {
                console.log(data.msg);
              } else {
                console.log(data.msg);
              }
            }
        });*/
      },
      cancel: function cancel() {}
    };

    var jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
    wx.config({
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: jsApiList
    });

    wx.ready(function () {
      wx.onMenuShareTimeline(shareOption);
      wx.onMenuShareAppMessage(shareOption);
    });
  }
});
