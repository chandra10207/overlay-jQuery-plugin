## Overlay

jQuery plugin for creating an overlay which covers the whole page or only part of the page

<strong>Usage:</strong>

>		$("body").overlay();//for full screen
>		$("div.player").overlay();//shadows only this element

<strong>Options:</strong>
<p>
	<ul>
		<li>
			<b>color</b>
			<p>The color for the overlay, defaults to '#222'</p>
		</li>
		<li>
			<b>zindex</b>
			<p>
				The z-index value for the overlay, defaults to 1.<br/>
				To make the overlay currently covers the underlying element, normally this option shall be specified.
			</p>
		</li>
		<li>
			<b>opacity</b>
			<p>
				The opacity for the overlay, defaults to 0.5
			</p>
		</li>
		<li>
			<b>styleClass</b>
			Customizable class to be applied to the newly created element.<br/>
			If this option is specified, the opacity, color and zindex options will be ignored, you have to adjust them yourself.<br/>
			By default, I will zero out the margin/padding/border of the overlay element to suppress styles unintentionally applied to it. These will <b>not</b> be done when styleClass option is specified.
		</li>
	</ul>
</p>
<strong>Return Value:</strong>
<p>
	<p>
		Rather than returning original set of jQuery objects, 
		<code>overlay</code> method will return a special object with following properties:
	</p>
	<ul>
		<li>
			<b>get:</b>
			<p>Return the overlay element created on the fly. It is a plain DOM element, not a jQuery object.</p>
		</li>
		<li>
			<b>destroy:</b>
			<p>Destroys the overlay element. This function also return the created DOM element.</p>
		</li>
	</ul>
</p>
**Notice:**
<ul>
	<li>
		No matter how many DOM elements are contained in the jQuery object used to invoke this plugin,
		only the first one is processed.		
	</li>
	<li>
		Currently I use the <code>resize</code> event to keep non-full-screen overlay stick to the target element, due to different behavior for this event, the plugin may work differently.
	</li>
</ul>
