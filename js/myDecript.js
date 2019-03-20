(function( $ ) {
  $.fn.myDecrypt = function(options) {
  
      var settings = $.extend({
      your_text: ''
    }, options);
      

      // Тут пишем функционал нашего плагина
    var make = function() {
		var $this = $(this);
		var h = $this.height();
		$this.css('lineHeight', h + 'px');
		var content  = $this.text();
		var new_sbstr = settings.your_text;
		var content_ar = new Array();
		var new_content = new Array();
		var i_count = new Array();
		var l = content.length;
		for(var i=0; i<l; i++) {
			content_ar[i] = content.charAt(i);
			new_content[i] = new_sbstr.charAt(i);
			i_count[i] = i;
		}
		
		function compareRandom() {
		  return Math.random() - .5;
		}
		i_count.sort(compareRandom);
		
		var c = 0;
		var m = 0;
		var r = 0;
		var n_heig = 0;
		function vstavka(b) {
			content_ar[i_count[b]] = new_content[i_count[b]];
			n_str = content_ar.join("");
			$this.text(n_str);
		}
		
		function middle_vstavka(b) {
			simbol = Math.floor(Math.random()*(43 - 33) + 33);
			content_ar[i_count[b]] = String.fromCharCode(simbol);
			n_str = content_ar.join("");
			$this.text(n_str);
		}
		
		(function timedCount() {			
			m = c / 2;
			c++;	
			if((c % 2) !== 0) {
				middle_vstavka(m);
				r++;
			}
			else if((c % 2) === 0){
				vstavka(r-1);
			}
			n_heig = $this.width();
			$this.parent().width(n_heig);
			if(c < 2 * l) {
				setTimeout(timedCount, 150);
			}
		})();
    }

    return this.each(make);

  };
})(jQuery);