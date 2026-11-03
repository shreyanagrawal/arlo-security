$(function(){
  var $hdr=$('header'), $nav=$('#nav'), $menu=$('.menu');

  // Mobile menu
  $menu.on('click',function(){
    var open=!$nav.hasClass('open');
    $nav.toggleClass('open',open); $menu.attr('aria-expanded',open).text(open?'Close':'Menu');
  });

  // Smooth scroll for in-page links
  $('a[href^="#"]').on('click',function(e){
    var id=$(this).attr('href'); if(id.length<2) return;
    var $t=$(id); if(!$t.length) return;
    e.preventDefault();
    var y=$t.offset().top-$hdr.outerHeight()+1;
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $('html,body').stop().animate({scrollTop:y},reduce?0:500);
    $nav.removeClass('open'); $menu.attr('aria-expanded',false).text('Menu');
    $t.attr('tabindex','-1').trigger('focus');
  });

  // Header shadow + scroll spy
  var ids=['products','how','plan','faq'];
  $(window).on('scroll',function(){
    var st=$(this).scrollTop();
    $hdr.toggleClass('scrolled',st>8);
    var cur='';
    $.each(ids,function(_,id){ if($('#'+id).offset().top-$hdr.outerHeight()-80<=st) cur=id; });
    $nav.find('a').removeClass('active').filter('[href="#'+cur+'"]').addClass('active');
  }).trigger('scroll');

  // FAQ accordion (one open at a time)
  $('.q').on('click',function(){
    var $q=$(this), $a=$q.next('.a'), open=$q.attr('aria-expanded')==='true';
    $('.q').not($q).attr('aria-expanded',false).next('.a:visible').slideUp(200,function(){$(this).attr('hidden',true)});
    $q.attr('aria-expanded',!open);
    if(open){ $a.slideUp(200,function(){$a.attr('hidden',true)}); }
    else{ $a.removeAttr('hidden').hide().slideDown(200); }
  });

  // Product cards: tap to highlight
  $('.prod').on('click',function(){ $(this).toggleClass('hl').siblings().removeClass('hl'); });

  // Simulated alert
  var timer;
  $('.sim').on('click',function(){
    var $t=$('.toast');
    clearTimeout(timer);
    $t.stop(true,true).slideDown(180);
    timer=setTimeout(function(){ $t.slideUp(220); },3500);
  });
});
