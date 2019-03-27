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
		.attr("width", function(d){
			return d * 2;
		})
		// set height
		.attr("height", function(d){
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

    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

    // find min value of array
    var minPop = d3.min(cityPop, function(d){
    	return d.population;
    });

    // find max value of array
    var maxPop = d3.max(cityPop, function(d){
    	return d.population;
    });

    // x-axis scale
    var x = d3.scaleLinear()
    	.range([90, 810]) // output min and max
    	.domain([0, 3]); // input min and max

    // y-axis scale
    var y = d3.scaleLinear()
    	.range([440, 95])
    	.domain([
    		minPop,
    		maxPop
    	]);

    // color scale generator
    var color = d3.scaleLinear()
    	.range([
    		"#FDBE85",
    		"#D94701"
    	])
    	.domain([
    		minPop,
    		maxPop
    	]);

	var circles = container.selectAll(".circles")
		.data(cityPop)
		.enter()
		.append("circle")
		.attr("class", "circles")
		.attr("id", function(d){
			return d.city;
		})
		.attr("r", function(d, i){
			var area = d.population * 0.01;
			return Math.sqrt(area/Math.PI);
		})
		.attr("cx", function(d, i){
			return x(i);
		})
		.attr("cy", function(d){
			return y(d.population);
		});
		// add fill color based on pop
		.style("fill", function(d, i){
			return color(d.population);
		})
		// black circle stroke
		.style("stroke", "#000");
};