$(function(){
$('.view').hover(function(){
     $(this).addClass('active');
     $(this).stop().animate({
         width:'48%',
         height:560,
     },300);
     $(this).find('.main').stop().fadeIn(100);
      $(this).siblings().stop().animate({
         width:'16.6%',
         height:540,
     },300);
     $(this).siblings().removeClass('active');
     $(this).siblings().find('.main').stop().fadeOut(100);
},function(){});
});