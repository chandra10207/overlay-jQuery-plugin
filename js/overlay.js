(function($) {
	$.fn.overlay=function(option){
		option = option || {};
		if(!this.length){
			return this;
		}
		var first = this.eq(0);
		var isBody = this[0] === document.body || this[0] === document.documentElement;
		var overlay = $("<div>");
		
		var pos;
		
		//if a full-screen overlay is required, we shall not retrieve the top and left value 
		//of html/body but directly zero them out.
		if(isBody){
			pos = function(){
				return {top:0,left:0};
			}
		}else{
			// Under Chrome, the position() method (in fact, the left property) does not work properly.
			// Chrome will treat horizontally centered div tags (being applied {margin:0} or {margin:0 auto} style)
			// as still stretching to full width of the page when calculating the left offset.
			// Thus the value returned from position().left is only the gap between <html> and <body>
			// In this case, we have to check the left offset ourselves.
			if(navigator.userAgent.indexOf('WebKit')!==-1){
				pos = function(){
					return {
						left: getComputedStyle(first[0]).marginLeft + 
						($(document.documentElement).innerWidth() - $(document.body).innerWidth())/2,
						top: first.position().top
					};
				}
			}else{
				pos = function(){
					if(first.css("position")==="relative"){
						return {
							top:0,
							left:0
						}
					}else{
						return first.position();
					}
				};
			}
		}
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
				.css("width",width)
				.css("height",height);
		// The top and left offset cannot be set once and for ever,
		// If we are not creating a full screen overlay, the position of the overlay
		// must be adjusted dynamically according to current size of the window
		$(window).resize(function(){
			var tmp = pos();
			overlay.css("top",tmp.top)
				.css("left",tmp.left);
		});
		first.append(overlay);
		
		$(window).resize(); //trigger the initial positioning
		
		return {
			get:function(){return overlay[0];},
			destroy:function(){return overlay.remove()[0];}
		};
	}
}(jQuery))
