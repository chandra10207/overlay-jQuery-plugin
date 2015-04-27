<strong>Usage:</strong>
<p>
	<pre>
		$("body").overlay();//for full screen
		$("div.player").overlay();//shadows only this element
	</pre>
</p>
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
			<p>Return the overlay element created on the fly. It is an plain DOM element, not a jQuery object.</p>
		</li>
		<li>
			<b>destroy:</b>
			<p>Destroys the overlay element. This function also return the created DOM element.</p>
		</li>
	</ul>
</p>
<strong>Notice:</strong>
<p>
	No matter how many DOM elements are contained in the jQuery object used to invoke this plugin,
	only the first one is processed.
</p>
