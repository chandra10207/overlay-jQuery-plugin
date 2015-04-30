(function($) {

    //default settings
	var _default = {
		opacity:0.5,
		color:'#222',
		zindex:1,
		styleClass:''//no default
	};

    //the DOM elements masked by this plugin
    //this array is only a cache for speeding up destroying overlay
	var _elements = [];

    //pair of overlay element and the underlying element,
    //both are jQuery objects
	var _targets = [];

    //extra operations on created overlays
	var actions = {

        /*
         * destroy one or all overlays created.
         * @elem the underlying DOM object or a set of jQuery objects, overlays on them will be
         *  destroyed. If this parameter is not provided, all overlays created by this plugin will
         *  be destroyed
         */
		destroy:function des(elem){
            if(elem.constructor === jQuery){
                elem.each(function(i,e){
                   des(e);
                });
                return;
            }
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

        /*
         * set the global default value for this plugin.
         * @param op property of this object will be written to the _default object
         * and override old settings.
         * */
		setdefault:function(op){
			$.extend(_default,op);
		}
	};

    /*utility function for destroy all overlays*/
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

        //execute operations or just create an overlay
		if(typeof option === 'string'){
			actions[option]([].slice.call(arguments,1)[0]);
			return;
		}
		if(!this.length){
			return this;
		}
		
		$.extend({},_default,option);
		
		this.each(function(i,e){

            //already masked with an overlay
			if($.inArray(this,_elements)!==-1){
				return;
			}
			
			var self = $(this);
			var overlay = $("<div>");

            //use custom style class or not
			if( ! option['styleClass']){
				overlay.css("background-color",option['color'])
                            .css("z-index",option['zindex'])
                            .css("opacity", +option['opacity'])
                            //for IE8(Q)
                            .css("-ms-filter","progid:DXImageTransform.Microsoft.Alpha(Opacity="+(+option['opacity'])*100+")")
                            //for IE5-7
                            .css("filter","alpha(opacity="+(+option['opacity'])*100+")")
                            .css("margin","0")
                            .css("padding","0")
                            .css("border","none");
			}else{
				overlay.toggleClass(option['styleClass']);
			}

            //if we are about to mask an fixed-positioend element
            //the position property of the overlay shall also be 'fixed'
            //or it will not stick to the target element
			if(self.css("position")==='fixed'){
				overlay.css("position","fixed");
			}else{
				overlay.css("position","absolute");
			}
			
			$("body").append(overlay);

            //put the DOM element into the cache
			_elements.push(this);

            //push the overlay and target element to the array
            //for later use
			_targets.push({
				self:self,
				overlay:overlay
			});
		});

        //in the resize event listener
        //we traverse the _targets array
        //and adjust the overlay to make it sticking to the
        //DOM element
		$(window).resize(function(){
			$.each(_targets,function(i,e){
                //the array is sparse
				if(!e){
					return;
				}
				e.overlay.css("width", e.self.outerWidth())
							.css("height",e.self.outerHeight());

                //when it comes to fixed-positioned element
                //we shall use the BoundingClientRect function
                //not offset() method from jQuery to retrieve the correct
                //top and left offset
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
