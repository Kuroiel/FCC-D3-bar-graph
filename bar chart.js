let width = d3.select("svg").attr("width");
let height = d3.select("svg").attr("height");
d3.select("#everything").attr("align", "center");

d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then(function (data) {
  let dates = [];
  let value = [];
  let years = [];
  for (var i = 0; i < data.data.length; i++) {
    dates.push(data.data[i][0]);
    value.push(data.data[i][1]);
    years.push(data.data[i][0].slice(0, 4));
  }
  let scaledValue = [];
  for (var t = 0; t < value.length; t++) {
    tempScale = d3
      .scaleLinear()
      .domain([0, d3.max(value)])
      .range([0, height]);
    scaledValue.push(tempScale([value[t]]));
  }

  let scale2 = d3
    .scaleLinear()
    .domain([0, 275])
    .range([0, height - 245]);

  let temp1 = [];
  for (var j = 0; j < dates.length; j++) {
    temp1.push(new Date(dates[j]));
  }

  var xScale = d3
    .scaleTime()
    .domain([d3.min(temp1), d3.max(temp1)])
    .range([0, width - 48]);

  var yScale = d3
    .scaleLinear()
    .domain([d3.max(value), 0])
    .range([0, height - 40]);

  d3.select("svg")
    .append("g")
    .attr("transform", "translate(38, 480)")
    .attr("id", "x-axis")
    .call(d3.axisBottom(xScale));

  d3.select("svg")
    .append("g")
    .attr("transform", "translate(38, 19)")
    .attr("id", "y-axis")
    .call(d3.axisLeft(yScale));

  d3.select("svg")
    .selectAll("rect")
    .data(scaledValue)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return 38 + xScale(temp1[i]);
    })
    .attr("y", function (d, i) {
      return height - scale2(d) - 20;
    })
    .attr("width", width / 275)
    .attr("height", function (d) {
      return scale2(d);
    })
    .style("fill", "red")
    .attr("class", "bar")
    .attr("data-date", function (d, i) {
      return dates[i];
    })
    .attr("data-gdp", function (d, i) {
      return value[i];
    })
    .on("mouseover", function (d, i) {
      d3.select("#tooltip")
        .style("opacity", 0.8)
        .attr("data-date", dates[i])
        .html(
          "GDP: " + value[i] + " billion" + "<br>" + "Year/Month: " + dates[i]
        );
    })
    .on("mouseout", function (d, i) {
      d3.select("#tooltip").style("opacity", 0);
    });
});
