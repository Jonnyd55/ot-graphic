$(document).ready(function () {
	var overtime = 'eightOT',
		salary = 'eightsal',
		department = '08depcode',
		job = '08job',
		total =	'eightTotal',
		calculations = 'eightcals';
		
	
	
	$("#thirteen").click(function(e){
			e.preventDefault();
			$('a').removeClass('selected');
			$(this).addClass('selected');
			
			//reassign variables to change data points in graphic below
			overtime = 'thirteenOT';
			salary = 'thirteensal';
			department = '13depcode';
			job = '13job';
			total =	'thirteenTotal';
			calculations = 'thirteencals';
			
			//rebuild chart
			
			init();

		});
		
		
	$("#twelve").click(function(e){
			e.preventDefault();
			$('a').removeClass('selected');
			$(this).addClass('selected');
			
			//reassign variables to change data points in graphic below
			overtime = 'twelveOT';
			salary = 'twelvesal';
			department = '12depcode';
			job = '12job';
			total =	'twelveTotal';
			calculations = 'twelvecals';
			
			//rebuild chart
			
			init();

		});
		
	 $("#eleven").click(function(e){
			e.preventDefault();
			$('a').removeClass('selected');
			$(this).addClass('selected');
			
			overtime = 'elevenOT';
			salary = 'elevensal';
			department = '11depcode';
			job = '11job';
			total =	'elevenTotal';
			calculations = 'elevencals';
			
			init();

		});
		
	$("#ten").click(function(e){
			e.preventDefault();
			$('a').removeClass('selected');
			$(this).addClass('selected');
			
			overtime = 	'tenOT';
			salary = 'tensal';
			department = '10depcode';
			job = '10job';
			total =	'tenTotal';
			calculations = 'tencals';

			
			init();

		});

	$("#nine").click(function(e){
			e.preventDefault();
			$('a').removeClass('selected');
			$(this).addClass('selected');
			
			overtime = 	'nineOT';
			salary = 'ninesal';
			department = '09depcode';
			job = '09job';
			total =	'nineTotal';
			calculations = 'ninecals';
			
			init();

		});

	$("#eight").click(function(e){
			e.preventDefault();
			$('a').removeClass('selected');
			$(this).addClass('selected');
			
			overtime = 	'eightOT';
			salary = 'eightsal';
			department = '08depcode';
			job = '08job';
			total =	'eightTotal';
			calculations = 'eightcals';

			init();

		});		
		
		//Get the numbers with commas.
		function numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		}
		
		//Get the ID of the BUTTON that is currently selected. Used to return the year-specific data
		function getID() {
			var displayOption = $('.selected').attr('id');
			return displayOption;
		}
				
		// Get the name of the data sheet you want to load
		function getCityDataset () {
			var overtime = 'eightOT',
				select = document.getElementById("city");
			return select.options[select.selectedIndex].value;		
		}

		//Declaring variables that hold information required to build the D3 viz.
		var vis = d3.select("#visualisation"),
			commasFormatter = d3.format(",.0f"),
			numVis = d3.select("#numbers"),
			keyVis = d3.select("#key"),
			width = 960,
			height = 410,
			margins = {top: 20, right: 20, bottom: 20, left: 65},
			xRange = d3.scale.linear().range ([margins.left, width - margins.right]).domain([0, 300]),
			yRange = d3.scale.linear().range ([height - margins.top, margins.bottom]).domain([0, 300]),
			lineRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([0, 300]),
			xAxis = d3.svg.axis().scale(xRange).tickSize(2).tickSubdivide(true).tickFormat(function(d) { return "$" + commasFormatter(d);}),
			yAxis = d3.svg.axis().scale(yRange).tickSize(5).orient("left").tickSubdivide(true).tickFormat(function(d) { return "$" + commasFormatter(d);}),
			colors = [	
				"red",
				"#5ab4ac",
				"#DFC27D",
			],
			drawingData;
		
		//Initialize mean text
		numVis.append("text")
			.attr("id", "meantext")
			.attr("y", 40)
			.attr("x", 318)
			.style("font-size", "18px")
			.style("font-family","Arial, Helvetica, sans-serif")
			.style('font-weight', 'bold')
			.style('text-color', '#525252')
					
		//Initialize median text
		numVis.append("text")
			.attr("id", "mediantext")
			.attr("y", 40)
			.attr("x", 431)
			.style("font-size", "18px")
			.style("font-family","Arial, Helvetica, sans-serif")
			.style('font-weight', 'bold')
			.style('text-color', '#525252')
		
		//Initialize total text
		numVis.append("text")
			.attr("id", "totaltext")
			.attr("y", 40)
			.attr("x", 53)
			.style("font-size", "18px")
			.style("font-family","Arial, Helvetica, sans-serif")
			.style('font-weight', 'bold')
			.style('text-color', '#525252')
		
		//Initialize people text
		numVis.append("text")
			.attr("id", "peopletext")
			.attr("y", 40)
			.attr("x", 209)
			.style("font-size", "18px")
			.style("font-family","Arial, Helvetica, sans-serif")
			.style('font-weight', 'bold')
			.style('text-color', '#525252')
					
		keyVis.append("g")
			.append("line")
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', 28)
			.attr('y2', 0)
			.attr("id", "avgKeyLine")
			.attr('stroke','#000033')
			.attr('stroke-dasharray', '10,5,3,3,3,5')
			.attr('stroke-width', 1)
			.attr('fill', '#000')
			.attr("z-index", "100000")
			.attr("shape-rendering","crispEdges")
					
		keyVis.append("g")
			.append("line")
			.attr('x1', 0)
			.attr('y1', 13)
			.attr('x2', 22)
			.attr('y2', 13)
			.attr("id", "medianKeyLine")
			.attr('stroke','#000033')
			.attr('stroke-dasharray', '7,5')
			.attr('stroke-width', 1)
			.attr('fill', '#000')
			.attr("z-index", "100")
			.attr("shape-rendering","crispEdges")
		
		/*The function that rebuilds the visualization every time it's called. 
		It gets called everytime a button is clicked or the data select is changed */
		function init () {
			var cityset = getCityDataset();
			
			//Load the data that is stored in a .csv
			d3.csv("data/" + cityset + ".csv", function (data) {
					vis.append("svg:g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height - margins.bottom) + ")")
				//Initialize Y axis
				vis.append("svg:g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + (margins.left) + ",0)")
				//Initialize X axis label
				vis.append("text")
					.attr("x", width / 2)
					.attr("y", 423)
					.style("text-anchor", "middle")
					.style("font-size", "12px")
					.text("SALARY")
					.style("font-family","Arial, Helvetica, sans-serif")
					.attr("shape-rendering","crispEdges")

				//Initialize Y axis label	
				vis.append("text")
					.attr("y", 10)
					.attr("x", 0 - (height / 2))
					.attr("transform", "rotate(-90)")
					.style("text-anchor", "middle")
					.style("font-size", "12px")
					.text("OVERTIME")
					.style("font-family","Arial, Helvetica, sans-serif")
					.attr("shape-rendering","crispEdges")

				//Initialize median line
				vis.append('g')
					.append("line")
					.attr("id", "medianLine")
					.attr('stroke','#000033')
					.attr('stroke-dasharray', '7,5')
					.attr('stroke-width', 1)
					.attr('fill', '#000')
					.attr("z-index", "100")
					.attr("shape-rendering","crispEdges")
				//Initialize average line	
				vis.append('g')
					.append("line")
					.attr("id", "avgLine")
					.attr('stroke','#000033')
					.attr('stroke-dasharray', '10,5,3,3,3,5')
					.attr('stroke-width', 1)
					.attr('fill', '#000')
					.attr("z-index", "100")
					.attr("shape-rendering","crispEdges")
								
				//Build the visualization
				update(data);
				
			});
		}

		//Builds the visualization
		function update (drawingData) {
			
				
			//initializing the the circles transitions
			var circles = vis.selectAll("circle").data(drawingData, function (d) { return d.name; });
			var transition = vis.transition().duration(1000).ease("exp-in-out"); 
			
			
			
			//Updating the scales
			xRange.domain([
				d3.min (drawingData, function(d) { return +d[salary]; }),
				d3.max (drawingData, function(d) { return +d[salary] + 2000; })
			]);

			yRange.domain([
				d3.min (drawingData, function(d) { return +d[overtime]; }),
				d3.max (drawingData, function(d) { return +d[overtime] + 8000; })
			]);
			//updating the line scale
			lineRange.domain([
				d3.min (drawingData, function(d) { return +d[overtime]; }),
				d3.max (drawingData, function(d) { return +d[overtime] + 8000; })
			]);

			transition.select(".x.axis").call(xAxis);
			transition.select(".y.axis").call(yAxis);
			//update the circles
			circles
				.enter()
					.insert("svg:circle")
						.attr("class", "people")
						.attr("cx", function (d) { return xRange (+d[salary]); })
						.attr("cy", function (d) { return yRange (+d[overtime]); })
						.style("fill-opacity", .8)
						.style("fill", function (d) {return colors[+d[department]]; })
						.style("stroke", "black")
						.on("mouseover", function getdata(d) {
												
							/*xPosition and yPosition determine where the tooltip will appear. If the cx value of the data point is too far to the right of the chart, push it to the left side of the datapoint.   */	
							if (d3.select(this).attr("cx") > 725) {
								var xPosition = parseFloat(d3.select(this).attr("cx")) - 225;
							} else {
								var xPosition = parseFloat(d3.select(this).attr("cx")) + 25;
							} 
							
							if (d3.select(this).attr("cy") < 60) {
								var yPosition = parseFloat(d3.select(this).attr("cy")) + 30;
							} else {
								var yPosition = parseFloat(d3.select(this).attr("cy")) - 20;
							} 
													
							//Update the tooltip position and value
							d3.select("#tooltip")
								.style("left", xPosition + "px")
								.style("top", yPosition + "px")						
								.select("#value")
								.html(function(getdata) { 
									return "<b>Job: </b>" + (d[job]) + (+d[department]) +"<br /><b>Hire date:</b> " + (d.hiredate) + "<br /><b>Salary earned:</b> $" + numberWithCommas((+d[salary])) + "<br /><b>Overtime earned:</b> $" + numberWithCommas((+d[overtime])) + "<br /><b>Total earned:</b> <span style='color: red';>$" + numberWithCommas((+d[total])) + "</span>"
								
								})
								 
							//Show the tooltip
							d3.select("#tooltip").classed("hidden", false);
					   })
					   .on("mouseout", function() {
							//Hide the tooltip
							d3.select("#tooltip").classed("hidden", true);
					   })
									
			circles
				.transition().duration(1000).ease("exp-in-out")
					.attr("cx", function (d) { return xRange(+d[salary]); })
					.attr("cy", function (d) { return yRange(+d[overtime]); })
					.attr("r", function (d) { 
						if (((+d[overtime]) / 1500) == 0) {
							return 0;
						} else if (((+d[overtime]) / 1500) < 2) {
							return 2; 
						} else {
							return (+d[overtime]) / 1500; 
						}
							
						})
			//Remove the circles
			
			circles.exit ()
				.transition().duration(1000).ease("exp-in-out")
					.attr("r", 0)
						.remove ();
			//Countup the number of items that have an overtime value
			function countup(){
				var valids = circles.filter(function(d) { return +d[overtime] != 0; });
				return valids[0].length;
			};
				
			//Updating calculations in numbers box
			var sum = d3.sum(drawingData, function(d) {return +d[overtime]; }).toFixed(0);
			var mean = d3.mean(drawingData, function(d) {return +d[calculations]; }).toFixed(0);
			var median = d3.median(drawingData, function(d) {return +d[calculations]; }).toFixed(0);
			
			
			
			d3.select("#mediantext")
				.transition()
				.duration(500)
				.ease('linear')
				.tween("text", function() {
					var i = d3.interpolate(this.textContent, median);
					return function(t) {
					  this.textContent = '$' + d3.format(",")(Math.round(i(t)));
					};
				  })
			
			d3.select("#meantext")
				.transition()
				.duration(500)
				.ease('linear')
				.tween("text", function() {
					var i = d3.interpolate(this.textContent, mean);
					return function(t) {
					  this.textContent = '$' + d3.format(",")(Math.round(i(t)));
					};
				  })
				
			d3.select("#totaltext")
				.transition()
				.duration(500)
				.ease('linear')
				.tween("text", function() {
					var i = d3.interpolate(this.textContent, sum);
					return function(t) {
					  this.textContent = '$' + d3.format(",")(Math.round(i(t)));
					};
				  })
			
			d3.select("#peopletext")
				.transition()
				.duration(500)
				.ease('linear')
				.tween("text", function() {
					var i = d3.interpolate(this.textContent, countup());
					return function(t) {
					  this.textContent = d3.format(",")(Math.round(i(t)));
					};
				  })
				  
			//Updating the median and mean lines	
			d3.select("#medianLine")
				.transition()
				.duration(1000)
				.attr('x1', 68)
				.attr('y1', d3.median(drawingData, function(d) {return lineRange (+d[calculations]); }))
				.attr('x2', 940)
				.attr('y2', d3.median(drawingData, function(d) {return lineRange (+d[calculations]); }))
			
			d3.select("#avgLine")
				.transition()
				.duration(1000)
				.attr('x1', 68)
				.attr('y1', d3.mean(drawingData, function(d) {return lineRange (+d[calculations]); }))
				.attr('x2', 940)
				.attr('y2', d3.mean(drawingData, function(d) {return lineRange (+d[calculations]); }))
			
			
		}


		// Run the graphic
		init ();
		//Look for every time the data selected is changed. Then update teh graphic running the init function.
		document.getElementById("city").addEventListener("change", init, false);

	});


