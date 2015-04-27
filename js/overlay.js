(function($) {
	$.fn.overlay=function(option){
		option = option || {};
		if(!this.length){
			return this;
		}
		var first = this.eq(0);
		var isBody = this[0] === document.body || this[0] === document.documentElement;
		var overlay = $("<div>");
		
		//if a full-screen overlay is required, we shall not retrieve the top and left value 
		//of html/body but directly zero them out.
		var pos = isBody ? {top:0,left:0} : first.position();
		
		//100% is not enough for full-screen overlay,
		//should explicitly use the outerWidth/Height of document element
		var width = isBody ? $(document).outerWidth() : first.outerWidth();
		var height = isBody ? $(document).outerHeight() : first.outerHeight();
		overlay.css("background-color",option['color'] || '#222')
				.attr("z-index",option['zindex'] || '1')
				.css("opacity",option['opacity'] || '0.5')
				.css("margin","0")
				.css("padding","0")
				.css("border","none")
				.css("position","absolute")
				.css("top",pos.top)
				.css("left",pos.left)
				.css("width",width)
				.css("height",height);
		first.append(overlay);
		return {
			get:function(){return overlay[0];},
			destroy:function(){return overlay.remove()[0];}
		};
	}
}(jQuery))
