/* Javascript by Geri Rosenberg, 2019 */

// execute script when window is loaded
window.onload = function(){
	// svg dimension variables
	var w = 900, h = 500;

	// get the <body> element from the DOM
	var container = d3.select("body")
		// put a new svg in the body
		.append("svg")
		// assign the width
		.attr("width", w)
		// assign the height
		.attr("height", h)
		// always assign a class (as the block name) for styling and future selection
		.attr("class", "container")
		// assign a background color
		.style("background-color", "rgba(0,0,0,0.2)");

	// inner rectangle block
	var innerRect = container.append("rect")
		.datum(400)
		// set width
		.attr(width, function(d){
			return d * 2;
		})
		// set height
		.attr(height, function(d){
			return d;
		})
		// class name
		.attr("class", "innerRect")
		// position from left
		.attr("x", 50)
		// position from top
		.attr("y", 50)
		// fill color
		.style("fill", "#FFFFFF");
};