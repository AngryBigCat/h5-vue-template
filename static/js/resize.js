var wh = $(window).height();
var ww = $(window).width();
var app_width =  wh * 750 / 1206;
if (app_width > ww) {
  app_width = ww;
}
$('html').css('font-size', '16px');
$('body').css('width', app_width);
$('body').css('height', wh);
$('body').css('left', ww / 2 - $('body').width() / 2);
