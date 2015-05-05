(function($) {

	//default settings
	var _default = {
		opacity : 0.5,
		color : '#222',
		zindex : 1,
		styleClass : ''//no default
	};

	//the DOM elements masked by this plugin
	//this array is only a cache for speeding up destroying overlay
	var _elements = [];

	//pairs of overlay element and the underlying DOM element,
	//both are wrapped in jQuery object
	var _targets = [];

	//last set of overlay created
	//an jQuery object
	var _lastset;

	//extra operations
	var actions = {

		/*
		 * destroy a collection of overlays attached to the DOM elements
		 * wrapped by current jQuery object
		 */
		destroy : function() {
			this.each(function(i, e) {
				destroyOne(e);
			});
		},

		/*
		 * set the global default value for this plugin.
		 * @param an array of plain objects, property of these objects
		 *  will be written to the _default object
		 * and override old settings.
		 * */
		setdefault : function() {
			$.each(arguments, function(i, e) {
				$.extend(_default, e);
			})
		},

		/*
		 * destroy all overlays created by this plugin
		 */
		destroyall : function() {
			while (_elements.length) {
				_elements.pop();
			}
			while (_targets.length) {
				var ele = _targets.pop();
				if (ele) {
					ele.overlay.remove();
				}
			}
			_lastset = $("");
		},

		/*
		 * for the specified DOM elements or selectors, get the overlay (if any) attached to them
		 *  as one jQuery object. when called with no arguments, return the last set of overlays created.
		 * */
		get : function() {
			if (!arguments.length) {
				//return last set of masked DOM elements
				return _lastset;
			}
			var rtn = $("");
			$.each(arguments, function(i, e) {
				if (typeof e === 'string') {
					var elems = $(e);
					elems.each(function(i, e) {
						var ov = findOverlayForDOMElem(e);
						if (ov) {
							rtn = rtn.add(ov);
						}
					});
				} else {
					var ov = findOverlayForDOMElem(e);
					if (ov) {
						rtn = rtn.add(ov);
					}
				}
			});
			return rtn;
		}
	};

	function findOverlayForDOMElem(e) {
		var idx = $.inArray(e, _elements);
		if (idx === -1) {
			return;
		}
		return _targets[idx] ? _targets[idx].overlay : undefined;
	}

	/*
	 * utility function to destroy one overlay
	 */
	function destroyOne(elem) {
		var idx;
		if ((idx = $.inArray(elem, _elements)) === -1) {
			return;
		}
		_elements[idx] = undefined;
		_targets[idx].overlay.remove();
		_targets[idx] = undefined;
	}

	$.fn.overlay = function(option) {

		//call methods or create an overlay
		if ('string' === typeof option) {
			return actions[option].apply(this, [].slice.call(arguments, 1))
					|| this;
		}
		if (!this.length) {
			return this;
		}

		option = $.extend({}, _default, option);

		//clear cache of overlay
		_lastset = new jQuery();

		this.each(function(i, e) {

			//already masked with an overlay
			if ($.inArray(this, _elements) !== -1) {
				return;
			}

			var self = $(this);
			var overlay = $("<div>");

			//use custom style class or not
			if (!option['styleClass']) {
				overlay.css("background-color", option['color']).css("z-index",
						option['zindex']).css("opacity", +option['opacity'])
				//for IE8(Q)
				.css(
						"-ms-filter",
						"progid:DXImageTransform.Microsoft.Alpha(Opacity="
								+ (+option['opacity']) * 100 + ")")
				//for IE5-7
				.css("filter",
						"alpha(opacity=" + (+option['opacity']) * 100 + ")")
						.css("margin", "0").css("padding", "0").css("border",
								"none");
			} else {
				overlay.toggleClass(option['styleClass']);
			}

			//if we are about to mask an fixed-positioend element
			//the position property of the overlay shall also be 'fixed'
			//or it will not stick to the target element
			if (self.css("position") === 'fixed') {
				overlay.css("position", "fixed");
			} else {
				overlay.css("position", "absolute");
			}

			overlay.appendTo("body");

			//put the DOM element into the cache
			_elements.push(this);

			//push the overlay and target element to the array
			//for later use
			_targets.push({
				self : self,
				overlay : overlay
			});

			_lastset = _lastset.add(overlay);
		});

		//within the resize event listener
		//we traverse the _targets array
		//and adjust the overlay to keep it sticking to the
		//underlying DOM element
		$(window).resize(
				function() {
					$.each(_targets,
							function(i, e) {
								//the array can be sparse
								if (!e) {
									return;
								}
								e.overlay.css("width", e.self.outerWidth())
										.css("height", e.self.outerHeight());

								//when it comes to fixed-positioned element,
								//the BoundingClientRect() function shall be used 
								//instead of the offset() method from jQuery to retrieve the correct
								//top and left offset
								if (e.self.css("position") === 'fixed') {
									var box = e.self.get(0)
											.getBoundingClientRect();
									e.overlay.css("top", box.top).css("left",
											box.left);
								} else {
									var tmp = e.self.offset();
									e.overlay.css("top", tmp.top).css("left",
											tmp.left);
								}
							});
				});

		$(window).resize(); //trigger the initial positioning
		return this;
	}
}(jQuery))
