jQuery(function ($) {
    
    $('.audio').on("click", function(event) {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).addClass('off');
            $('.my-hidden-player').get(0).pause();
        } else {
            $(this).removeClass('off');
            $(this).addClass('on');
            $('.my-hidden-player').get(0).play();
        }
    });

    $('.bottom_links a, .block_link').on('click', function(e) {
        e.preventDefault();
        $(this).find(".bottom_link_span").fadeOut(300);
                                                 });
    
    
        $('.my-hidden-player').get(0).pause();
    $(window).load(function() {
        var gl_h = [];
        var gl_w = [];
        $('.glitch_span').each(function(indx) {
            gl_h.push($(this).height());
            gl_w.push($(this).width());
            $(this).parent().css({
                'height': gl_h[indx] + 'px',
                'width': gl_w[indx] + 'px'
            });
        });
        $('.block_2 .part li:first').addClass('active_span');
        $('.block_3 .part li:first').addClass('active_span');
        $('.part li:first').addClass('first_span');
        $('.block_2 .part li a:first').addClass('block_link_active');
        $('.block_3 .part li a:first').addClass('block_link_active');
        $('.little_banner, .content').css('display', 'none');
        $('.block_2 .content:first').css('display', 'block');
        $('.block_2 .little_banner:first').css('display', 'flex');
        $('.block_3 .content:first').css('display', 'block');
        $('.block_3 .little_banner:first').css('display', 'flex');
        $('.block_first_link').addClass('block_link_active');
        $('.block_2 .part li:eq(5)').addClass('active_span'); 
        $('.block_2 .part li:eq(8)').addClass('active_span');
		

		
        if($(window).width() > 768) $('audio').attr('autoplay', 'autoplay');
        if($(window).width() <= 768) {
            $('.block_2 .part li:eq(8), .block_2 .part li:eq(5)').css('margin-top', '20px');
            $('.bottom_links a:first').addClass('active_bottom_link');
            $(".block_2 .mob_header").text("КОМПАНИИ");
            $(".block_2 .header_en").text("COMPANIES");
            $(".block_2 .part li:eq(5)").addClass("second_span");
            $(".block_2 .part li:eq(8)").addClass("third_span");
        }
    });
    
    
    /*============ КЛИКИ НА ССЫЛКИ В БЛОКАХ 2 И 3 ===========*/
    
    $('.block_2 .block_link').on('click', function() {
        metka = $(this).attr('href'); 
        $('.block_2 .little_banner, .block_2 .content').css('display', 'none');
        $('#' + metka + '_banner').css('display', 'flex');
        $('#' + metka + '_banner .logo img').stop().fadeOut(0);
        $('#' + metka + '_banner .logo img').stop().fadeIn(300);        
        $('#' + metka + '_content').css('display', 'block');
        $('#' + metka + '_content').stop().fadeOut(0);
        $('#' + metka + '_content').stop().fadeIn(500);        
    });

    $('.block_3 .block_link').on('click', function() {
        metka = $(this).attr('href');  
        var elem_3 = $(this).parent().parent(); 
        elem_3.find('.block_first_link').removeClass('block_first_link');
        elem_3.find('a:first').addClass('block_first_link');
        $('.block_3 .little_banner, .block_3 .content').css('display', 'none');
        $('#' + metka + '_banner').css('display', 'flex');
        $('#' + metka + '_banner .logo img').stop().fadeOut(0);
        $('#' + metka + '_banner .logo img').stop().fadeIn(300);        
        $('#' + metka + '_content').css('display', 'block');
        $('#' + metka + '_content').stop().fadeOut(0);
        $('#' + metka + '_content').stop().fadeIn(500);         
    });
    
    /*========hover-эффекты на ссылки в списках========*/
    $('.block_link').hover(function() {
        $(this).addClass('block_link_hover');
    },
                          function() {
        $(this).removeClass('block_link_hover');        
    });
    /*=================================================*/


    if($(window).width() > 768) {
        $('.block_link').on('click', function() {
            var elem = $(this).parent().parent();
            elem.find('.block_link_active').removeClass('block_link_active');
            $(this).addClass('block_link_active');
        });
        $('.block_2 .block_link').on('click', function() {
            index = $(this).parent().index();
            if(index >= 0) {
                $('.block_2 .part li:eq(0)').addClass('first_span'); 
                $('.block_2 .part li:eq(5)').removeClass('second_span'); 
                $('.block_2 .part li:eq(8)').removeClass('third_span');    
            }
            if(index >= 5) {
               $('.block_2 .part li:eq(0)').removeClass('first_span'); 
               $('.block_2 .part li:eq(8)').removeClass('third_span'); 
               $('.block_2 .part li:eq(5)').addClass('second_span'); 
            }
            if(index >= 8) {
               $('.block_2 .part li:eq(0)').removeClass('first_span');  
               $('.block_2 .part li:eq(5)').removeClass('second_span'); 
               $('.block_2 .part li:eq(8)').addClass('third_span'); 
            }
        });
    }
    

    else {
        var elem = $(this).parent().parent();
        $('.block_link').on('click', function() {
            var elem = $(this).parent().parent().parent().parent();
            elem.find('.block_link_active').removeClass('block_link_active');
            elem.find('.block_first_link').removeClass('block_first_link');
            elem.find('a:first').addClass('block_first_link');
            elem.css('display', 'none');
            $(this).addClass('block_link_active');
            elem.parent().parent().find('.mob_hidden').css('display', 'block');
        });
        $('.back div').on('click', function() {
           var main =  $(this).parent().parent().parent().parent();
           if(main.find('.mob_hidden').css('display') == 'block') {
               main.find('.mob_hidden').fadeOut(0);
               main.find('.hidden_block').fadeIn(500);
           }
        });
    }
    /*========================================================*/
	
    
    /*=================================================
    hover-эффекты на баннеры в block_2 и block_3
    ==================================================*/
    
            
    $('.block_2_banner_left').hover(function() {
        $(this).find('.block_2_mask').stop().fadeTo(500, 0.9);
        $('.block_2_banner .logo').stop().animate({ left: 45}, 500);
        $('.block_2_banner_before').stop().animate({width: 120}, 500);
    },
                                                 function() {
        $(this).find('.block_2_mask').stop().fadeTo(500, 0.4);
        $('.block_2_banner .logo').stop().animate({ left: 0}, 500);
        $('.block_2_banner_before').stop().animate({width: 70}, 500);
    });
    
        
    if($(window).width() > 768) {
        $('.block_2_banner_right').hover(function() {
           $(this).find('.mask').stop().fadeOut(500);
            $(this).stop().animate({width: 305}, 500);
        },
                                        function() {
            $(this).find('.mask').stop().fadeIn(500);
            $(this).stop().animate({width: 292}, 500);
        });
    }
    
    $('.block_3 .little_banner').hover(function() {
        $(this).find('.mask').stop().fadeTo(500, .9);
        $(this).find('.logo').css({'padding-right':'113px'});
        $(this).find('.block_3_banner_after').stop().animate({ width: 6.5 + 'vw' }, 500);
    },
                             function() {
         $(this).find('.mask').stop().fadeTo(500, 0);
        $(this).find('.logo').css({'padding-right':''});
        $(this).find('.block_3_banner_after').stop().animate({ width: 4 + 'vw' }, 500);
    });
    /*===================================================*/
    
    
    
    /*=================================================
    hover-эффекты на ссылки в баннере
    ==================================================*/
    function hover_arrow(elem, set_width, return_width, set_left, return_left, left_img, return_left_img) {
        $(elem).hover(function() {
        $(this).parent().stop().animate({ width: set_width + '%'}, 500);
        $(this).parent().find('.city').stop().fadeIn(500);
        $(this).find('+.mask').stop().fadeTo(500, .6);
        $(this).find('img').stop().animate({ left: left_img }, 500);
    },
                                                  function() {
        $(this).find('+.mask').stop().fadeTo(500, 1);
        $(this).parent().find('.city').stop().fadeOut(0);
        $(this).parent().stop().animate({ width: return_width + '%'}, 500);
        $(this).find('img').stop().animate({ left: return_left_img }, 500);
        
    });}
    
    
    
    if($(window).width() <= 1368 && $(window).width() > 768) {
        hover_arrow('.left_link .arrow', 18, 16, 0, 0, 105, 0);
        hover_arrow('.right_link .arrow', 20, 16, 50, 0, -40, 20);       
    } 
    else if($(window).width() > 1368) {
        hover_arrow('.left_link .arrow', 17.5, 11, 110, 0, 135, 0);
        hover_arrow('.right_link .arrow', 16, 11, -55, 10, -30, 0); 
    }
    /*===================================================*/
    
    $('.slider_link').on('click', function () {
       $(this).find('.mask').fadeOut(100); 
       $(this).find('.mask').fadeIn(300); 
    });
    


    /*==========================================================*/
	
    setTimeout(function(){
		if($('#glitch_1r')) $('#glitch_1r').myDecrypt({your_text: "NETRUNNER"});
	}, 1000); 
    setTimeout(function(){
    }, 1000);         

	setTimeout(function(){
		$('.glitch_span').addClass("glitch");
		}, 6000);

    /*==================== анимация стрелки =====================*/
    if($(window).width() <= 768)
    (function animation() {
       var options = {
          duration: 800,
          easing: 'linear'
       };

       $('.arrow_finger')
          .animate({
                marginLeft: -75,
                opacity: 1
             },
             options
          )
          .animate({
                marginLeft: -33,         
                opacity: 0
             },
             $.extend(true, {}, 0, {
                complete: function() {
                   animation();
                }
             })
          );
    })();
    /*==========================================================*/
    
    
    
    /*==================== ГЛАВНЫЙ СЛАЙДЕР =====================*/
    var glob_count=0;
        
     var swiper = new Swiper('.swiper-container', {
        keyboardControl: true,
        pagination: '.bottom_links',
        paginationType: 'bullets',
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'slide',
        paginationClickable: true,
        mousewheelControl: true,
        shortSwipes: false,
        longSwipesRatio: .1,
        touchReleaseOnEdges: true,
		touchMoveStopPropagation: false,
        breakpoints: {
            768: {
              shortSwipes: true
            }
        },
        onTransitionStart: function(swiper) {
         var count = swiper.activeIndex + 1;
         glob_count++;
        if(glob_count > 0) $('.finger').css('display', 'none');
        if(count == 2) {
            if($(window).width() <= 768) {
        		if($('.block_2_right').css('display') =='none' && glob_count != 2) $('.block_2 .hidden_block').fadeIn(1500);
        	}
            else $('.block_2 .hidden_block').fadeIn(1500);
 
            if($(window).width() <= 1366 && $(window).width() > 768) $('.block_2 .header').css({'color':'#000', 'left':'-12vw', 'opacity':'1'});
            else if($(window).width() <= 768 && $(window).width() > 360) $('.block_2 .header').css({'color':'#000', 'left':'-14vw', 'opacity':'1'});
            else if($(window).width() <= 360) $('.block_2 .header').css({'color':'#000', 'left':'-12%', 'opacity':'1'});
                
            
            else $('.block_2 .header').css({'color':'#000', 'left':'-4%', 'opacity':'1'});   
                    
            $('.block_2_right').css({ 'left': '0', 'opacity':'1'});
                                 
        }
        else {
                $('.block_2 .header').css({'left':'', 'color':''});  
            if($(window).width() > 768) {
                $('.block_2 .hidden_block').css({'display':''});
                $('.block_2_right').css({'left':'', 'opacity':''});
            }
        }
        if(count == 3) {
            $('.block_3 .hidden_block').fadeIn(1500);  
            if($(window).width() <= 1920 && $(window).width() > 768) $('.block_3 .header').css({'color':'#000', 'left':'0', 'opacity':'1'});
            else $('.block_3 .header').css({'color':'#000', 'left':'45px', 'opacity':'1'});   
            $('.block_3_left').css({ 'top': '0',  'opacity': '1' });
        }
        else {
                $('.block_3').find('.header').css({'left':'', 'color':'', 'opacity':''});  
            if($(window).width() > 768) { 
                $('.block_3').find('.hidden_block').css({'display' : ''});
                $('.block_3_left').css({'top':'', 'opacity': '0' });
               }
        }
        if(count == 4) {
            $('.block_4').find('.header').css({'color':'#000', 'top':'0', 'opacity':'1'});
            $('.right_blue-line').css({'backgroundColor' : 'transparent'});
             }
        else {
            
            $('.block_4').find('.header').css({'top':'', 'color':''});
            $('.right_blue-line').css({'backgroundColor' : ''});
        }
      }
     });

     $("#map_canvas").on("mouseover", function() {
        swiper.lockSwipeToPrev();
    });
	 $("#map_canvas").on("mouseout", function() {
        swiper.unlockSwipeToPrev();
    });

	$('.swiper-pagination-bullet').hover(function() {
		$(this).find('.bottom_link_span').fadeIn(100);
	},
	 function() {
		$(this).find('.bottom_link_span').fadeOut(150);
	} );
});