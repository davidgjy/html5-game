;(function($){
	$.fn.loading=function(src){
		var div=$('<div>').addClass('loading'),
			that=this,
		    overlay=$('<div>').addClass('shade'),
		    html=$('<div>').addClass('circle'),
			src = src || '../images/down/binpit_circle_1.png',
            before = $('<i>');
		    img=$('<img>').attr({'width':60,'height':60,src:src}).addClass('logo');
			div.append(html);
			div.append(img);
			html.append(before);
			if($(this).prop('tagName').toLowerCase() !='body'){
			 	if(($(this).css('position')=='static')){
					$(this).css('position','relative')
				};
			}
			$(this).append(overlay);
			$(this).append(div);
	};
	$.fn.closed=function(){
		$(this).find('.shade') && $(this).find('.shade').hide();
		$(this).find('.loading') && $(this).find('.loading').hide();
	}
	$.fn.open=function(){
		$(this).find('.shade')&&$(this).find('.shade').show();
		$(this).find('.loading')&&$(this).find('.loading').show();	
	}
})(jQuery);