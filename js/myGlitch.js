(function( $ ) {
  $.fn.myGlitch = function(options) {
  
      var settings = $.extend({
      background: '#fff'
    }, options);
	
	
    var make = function() {

      var $this = $(this);
      var w = $this.width();
      var h = $this.height();
      
        var text_clone_f  = $this.clone().css({
		'position': 'absolute',
		'top' : 0,
		'left' : 0
		});
        text_clone_f.insertAfter($this);
        var text_clone_s  = $this.clone().css({
		'position': 'absolute',
		'top' : 0,
		'left' : 0
		});
        text_clone_s.insertAfter($this);
        var text_clone_t  = $this.clone().css({
		'position': 'absolute',
		'top' : 0,
		'left' : 0
		});
        text_clone_t.insertAfter($this);
      (function animation() {
        var rndmtime_toleft = Math.random()*50;
        var rndmtime_toback = Math.random()*2500;
        var rndmtime_global = Math.random()*(3500 - 1200) + 1200;
        var top_clip = Math.random()*.1*h;
        var right_clip = Math.random()*(w - .9*w) + .9*w;
        var bottom_clip = Math.random()*(.8*h - .5*h) + .5*h;
        var left_clip = Math.random()*.01*w;
        var height_clip_1 = Math.random()*(.49*h - .47*h) + .47*h;
        var height_clip_2 = Math.random()*(.58*h - .52*h) + .52*h;
        var height_clip_3 = Math.random()*(.58*h - .12*h) + .12*h;
        var height_clip_4 = Math.random()*(.80*h - .78*h) + .78*h;
        var height_clip_5 = Math.random()*(.15*h - .13*h) + .13*h;
        var height_clip_6 = Math.random()*(.17*h - .15*h) + .15*h;
        var R = Math.floor(Math.random()*15);
        var G = Math.floor(Math.random()*15);
        var B = Math.floor(Math.random()*15);
        var variant = Math.floor(Math.random()*(7 - 1) + 1);
         text_clone_f.css({
                'display' : 'block',
                'clip': 'rect('+ height_clip_1 +'px, '+ right_clip +'px, '+ height_clip_2 +'px, '+ left_clip +'px)',
                'left': '50%',
                'transform': 'skewX(-50deg) scale(1.1) translate(-45%, 0)',
                'background': settings.background,
                'text-shadow': '2px 2px 3px #' + R.toString(16) + G.toString(16) + B.toString(16),
                'z-index': 10000
            });
         text_clone_t.css({
                'display' : 'block',
                'clip': 'rect('+ height_clip_5 +'px, '+ right_clip +'px, '+ height_clip_6 +'px, '+ left_clip +'px)',
                'left': '50%',
                'transform': 'skewX(-50deg) scale(1.1) translate(-45%, 0)',
                'background': settings.background,
                'text-shadow': '2px 2px 3px #' + R.toString(16) + G.toString(16) + B.toString(16),
                'z-index': 10000
            });
         switch(variant) {
         	case 1: text_clone_f.css('display', 'none');
         	break;
         	case 2: text_clone_s.css('display', 'none');
         	break;
         	case 3: text_clone_t.css('display', 'none');
         	break;
         	case 4:
         		text_clone_f.css('display', 'none');
         		text_clone_s.css('display', 'none');
         	break;
         	case 5:
         		text_clone_f.css('display', 'none');
         		text_clone_t.css('display', 'none');
         	break;
         	case 6:
         		text_clone_t.css('display', 'none');
         		text_clone_s.css('display', 'none');
         	break;
         	default: text_clone_f.css('display', 'none');
         }
       $this.css('text-shadow', '2px 4px 6px #' + R.toString(16) + G.toString(16) + B.toString(16));

         var anim_options = {
            duration: rndmtime_global,
            easing: 'linear'
         };

         text_clone_f
            .animate({
                marginLeft: left_clip*1.5,
                top: top_clip*3
             },
             rndmtime_toback
            )
            .animate({
                  marginLeft: 0,
                  top: 0
               },
               $.extend(true, {}, rndmtime_toback, {
                  complete: function() {
                      $this.css('text-shadow', 'none');
                      text_clone_f.css({
                        "transform": "skewX(0deg) translate(-50%, 0) scale(1)",
                        "display": 'none',
                        'background' : 'none'
                      });
                  }
               })
            );

            text_clone_t
            .animate({
                marginLeft: left_clip*1.5,
                top: top_clip*5
             },
             rndmtime_toback
            )
            .animate({
                  marginLeft: 0,
                  top: 0
               },
               $.extend(true, {}, rndmtime_toback*0.5, {
                  complete: function() {
                      $this.css('text-shadow', 'none');
                      text_clone_t.css({
                        "transform": "skewX(0deg) translate(-50%, 0) scale(1)",
                        "display": 'none',
                        'background' : 'none'
                      });
                      setTimeout(animation, rndmtime_global);
                  }
               })
            );

      })();
    }

    return this.each(make);

  };
})(jQuery);