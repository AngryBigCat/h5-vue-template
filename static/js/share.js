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

    var shareOption = {
      title: '美论小条',
      desc: '美论小条',
      link: localhost,
      imgUrl: localhost + '/static/img/logo/logo.png',
      success: function success() {},
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
