## Overlay

jQuery plugin for creating overlays which mask the whole page or specified elements.

###Usage:

````
$("html").overlay();//for full screen
$("div.player1,div.player2").overlay();//shadows two elements
````

###Options:

1. **color**

	The color for the overlay, defaults to '#222'

2. **zindex**

	The z-index value for the overlay, defaults to 1.

3. **opacity**

	The opacity for the overlay, defaults to 0.5

4. **styleClass**

	A css class to be applied to the newly created overlay.
	
	If this option is specified, the opacity, color and zindex options will be ignored, you have to manage them yourself.
	
	By default, I will zero out the margin/padding/border of the overlay element to suppress styles unintentionally applied to it. These will also *not* be done when styleClass option is specified.

###Return Value:

Returns the original set of jQuery objects.

###Methods:

call additional methods by calling ````$("any selector").overlay("method name",extraArgs)````. Type of the first argument determines whether to call a methods or call the original overlay function:

+ **destroy**


 destroy all overlays attached to the DOM elements wrapping in the current jQuery object.
	
+ **destroyall**

  destroy all overlays created by this plugin.
 
  example:
	````
	$("div.div1,div.div2,div.div3").overlay();//create overlays for div1, div2 and div3
	//do something else
	$("div.div1,div.div3").overlay("destroy");//destroy overlays only for div1 and div3
	$("").overlay("destroyall");//destroy all overlays, what is contained in the current jQuery object does not matter.
	````
	
+ **setdefault**

  pass a plain object to override the default global settings for this plugin.

###Notice:

  This plugin will create overlays for all DOM elements wrapped in the current jQuery object. Be sure to include only those you want to mask when invoking this plugin.
  
  use ````$("html").overlay()```` but not ````$("body").overlay()```` to correctly mask the whole page.
