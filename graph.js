
function makeGraph(sensorId, yLabel, d3Id) {
  var DATA_DIR = 'data'

  var svg = d3.select("#" + d3Id),
      margin = {top: 20, right: 20, bottom: 110, left: 40},
      margin2 = {top: 430, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      height2 = +svg.attr("height") - margin2.top - margin2.bottom;

  var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

  var x = d3.scaleTime().range([0, width]),
      x2 = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      y2 = d3.scaleLinear().range([height2, 0]);

  var xAxis = d3.axisBottom(x),
      xAxis2 = d3.axisBottom(x2),
      yAxis = d3.axisLeft(y);

  var brush = d3.brushX()
      .extent([[0, 0], [width, height2]])
      .on("brush end", brushed);

  var zoom = d3.zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", zoomed);

  svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);

  var focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var context = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  d3.csv(DATA_DIR + "/" + sensorId + ".csv", type, function(error, data) {
    if (error) throw error;

    x.domain(d3.extent(data, function(d) { return d.datetime; }));
    y.domain([0, d3.max(data, function(d) { return d[yLabel]; })]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    // The main graph
    focus.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "datapoints")
        .attr("class", "dot")
        .attr("cx", function(d) { return x(d.datetime); })
        .attr("cy", function(d) { return y(d[yLabel]); })
        .attr("r", 3)

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

    // The Brush graph
    context.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return x2(d.datetime); })
        .attr("cy", function(d) { return y2(d[yLabel]); })
        .attr("r", 2);

    context.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, x.range());

    svg.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);
  });
      svg.append("text")
          .attr("x", (width / 2))
          .attr("y", margin.top)
          .attr("text-anchor", "middle")
          .style("font-size", "24px")
          .style("text-decoration", "underline")
          .text(yLabel);

  function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    focus.selectAll("circle").attr("cx", function(d) { return x(d.datetime); })
    focus.select(".axis--x").call(xAxis);
    svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
        .scale(width / (s[1] - s[0]))
        .translate(-s[0], 0));
  }

  function zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
    var t = d3.event.transform;
    x.domain(t.rescaleX(x2).domain());
    focus.selectAll("circle").attr("cx", function(d) { return x(d.datetime); })
    focus.select(".axis--x").call(xAxis);
    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
  }

  function type(d) {
    d.datetime = parseDate(d.datetime);
    d[yLabel] = +d[yLabel];
    return d;
  }
}
