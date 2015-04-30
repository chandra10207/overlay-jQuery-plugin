(function($) {
	
	var _default = {
		opacity:0.5,
		color:'#222',
		zindex:1,
		styleClass:''//no default
	};
	
	var _elements = [];
	var _targets = [];
	
	var actions = {
		destroy:function(elem){
			if(!elem){
				destroyAll();
				return;
			}
			var idx;
			if((idx=$.inArray(elem,_elements))===-1){
				return;
			}
			_elements[idx]=undefined;
			_targets[idx].overlay.remove();
			_targets[idx]=undefined;
		},
		setdefault:function(op){
			$.extend(_default,op);
		}
	};
	
	function destroyAll(){
		while(_elements.length){
			_elements.pop();
		}
		while(_targets.length){
			var ele = _targets.pop();
			ele.overlay.remove();
		}
	}
	
	$.fn.overlay=function(option){
		if(typeof option === 'string'){
			actions[option]([].slice.call(arguments,1)[0]);
			return;
		}
		if(!this.length){
			return this;
		}
		
		option = $.extend($.extend({},_default),option);
		
		this.each(function(i,e){
			
			if($.inArray(this,_elements)!==-1){
				return;
			}
			
			var self;
			if(this === document.body){
				self = $(document.documentElement);
			}else{
				var self = $(this);
			}
			
			var overlay = $("<div>");
			
			if( ! option['styleClass']){
				overlay.css("background-color",option['color'])
				.attr("z-index",option['zindex'])
				.css("opacity", +option['opacity'])
				//compatibility for IE8(Q)
				.css("-ms-filter","progid:DXImageTransform.Microsoft.Alpha(Opacity="+(+option['opacity'])*100+")")
				//compatibility for IE5-7
				.css("filter","alpha(opacity="+(+option['opacity'])*100+")")
				.css("margin","0")
				.css("padding","0")
				.css("border","none");
			}else{
				overlay.toggleClass(option['styleClass']);
			}
			
			if(self.css("position")==='fixed'){
				overlay.css("position","fixed");
			}else{
				overlay.css("position","absolute");
			}
			
			overlay//test
					.html(self.text())
					.css("font-size","70px")
					.css("font-weight","800");
					//test
			
			$("body").append(overlay);
			
			_elements.push(self.get(0));
			
			_targets.push({
				self:self,
				overlay:overlay
			});
		});
		
		$(window).resize(function(){
			$.each(_targets,function(i,e){
				if(!e){
					return;
				}
				e.overlay.css("width", e.self.outerWidth())
							.css("height",e.self.outerHeight());
				if(e.self.css("position")==='fixed'){
					var box = e.self.get(0).getBoundingClientRect();
					e.overlay.css("top",box.top).css("left",box.left);
				}else{
					var tmp = e.self.offset();
					e.overlay.css("top",tmp.top).css("left",tmp.left);
				}
			});
		});
		
		$(window).resize(); //trigger the initial positioning
		return this;
	}
}(jQuery))
