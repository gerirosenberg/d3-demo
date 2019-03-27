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
    	.range([90, 760]) // output min and max
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
		})
		// add fill color based on pop
		.style("fill", function(d, i){
			return color(d.population);
		})
		// black circle stroke
		.style("stroke", "#000");

	// create circle labels
	var labels = container.selectAll(".labels")
		.data(cityPop)
		.enter()
		.append("text")
		.attr("class", "labels")
		.attr("text-anchor", "left")
		.attr("y", function(d){
			// vertical position centered on each circle
			return y(d.population) - 4;
		})

	// first line of label
	var nameLine = labels.append("tspan")
		.attr("class", "nameLine")
		.attr("x", function(d, i){
			// position to right of each circle
			return x(i) + 5 + Math.sqrt(d.population * 0.01 / Math.PI)
		})
		.text(function(d){
			return d.city;
		});

	// format generator
	var format = d3.format(",");

	// second line of label
	var popLine = labels.append("tspan")
		.attr("class", "popLine")
		.attr("x", function(d, i){
			// position to the right of each circle
			return x(i) + 5 + Math.sqrt(d.population * 0.01 / Math.PI)
		})
		.attr("dy", "15") // vertical offset
		.text(function(d){
			return "Pop. " + format(d.population);
		});

	// add title
	var title = container.append("text")
		.attr("class", "title")
		.attr("text-anchor", "middle")
		.attr("x", 450)
		.attr("y", 30)
		.text("City Populations");
};