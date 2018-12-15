import * as d3 from 'd3'

// Set up margin/height/width

var margin = { top: 100, left: 100, right: 105, bottom: 80 }

var height = 700 - margin.top - margin.bottom

var width = 700 - margin.left - margin.right

// Add your svg

var svg = d3
  .select('#market-share')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create a time parser (see hints)

let parseTime = d3.timeParse('%d/%m/%Y')

// Create your scales

let xPositionScale = d3.scaleLinear().range([0, width])

let yPositionScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([height, 0])

let colorScale = d3
  .scaleOrdinal()
  .range([
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a'
  ])

// Create a d3.line function that uses your scales
/*
var line = d3
  .line()
  .x(d => xPositionScale(d.datetime))
  .y(d => yPositionScale(d.Share))


var stack = d3.
stack()
.offset("zero")
.values()
.x()
.y()
*/


//.values(function (d) { return d.values})
//.x()
//.y()

//var series = stack(nested)
/*
var stack = d3.
stack()
//.key(d => d.Company)

//.offset("zero")
stack.keys(keys)
*/






var area = d3
.area()
.x(d => xPositionScale(d.datetime))
.y0(height)
.y1(d => yPositionScale(d.Share))


/*

*/
// Read in your housing price data

d3.csv(require('./data/meal_kit_share_formatted.csv'))
  .then(ready)
  .catch(err => {
    //  console.log("The error is", err)
  })


// Write your ready function

function ready(datapoints) {
  // console.log('Data is', datapoints)
  // Convert your months to dates

  datapoints.forEach(d => {
    d.datetime = parseTime(d.Time)
   // console.log(d.datetime)
    d.Share = +d.Value
  })
  //


  // Get a list of dates and a list of prices

  let months = datapoints.map(d => d.datetime)
  //console.log(d3.extent(months))
  //let gifts = datapoints.map(d => +d.GiftAmount)

  var keys = datapoints.map(d => d.Company)

  xPositionScale.domain(d3.extent(months))

  //yPositionScale.domain(d3.extent(gifts))

  // Group your data together

  var nested = d3
    .nest()
    .key(d => d.Company)
    .entries(datapoints)



  var stack = d3
    .stack()
    .keys(keys)
    .value((d, key) => d.get(key).value)(nested)
    .//x(function(d) { return d.Time })
    //.y(function(d) { return d.Share })
    //.offset("zero")

//var layers = stack(nested.entries(datapoints))

  console.log(nested)

  // Draw your lines



  svg
    .selectAll('.share-area')
    //.data(stack(datapoints))
    .data(stack)
    .enter()
    .append('path')
    .attr('class', 'share-area')
    .attr('class', function(d) {
      return d.key
    })
    .attr('d', d => {
      // d.key on esim NYC ja d.values on noi kaikki datapoints
      // console.log(d)
      return area(d.values)
    })
    .attr('stroke', d => colorScale(d.key))
    .attr('stroke-width', 2)
    .attr('fill', d => colorScale(d.key))
    .lower()

  // Adding my circles

  svg
    .selectAll('.last-circle')
    .data(nested)
    .enter()
    .append('circle')
    .attr('class', function(d) {
      return d.key
    })
    // .attr('class', 'last-circle')
    .attr('r', 3)
    .attr('cx', width)
    .attr('cy', function(d) {
      // console.log(d.values[5])
      return yPositionScale(d.values[5].GiftAmount)
    })
    .attr('fill', d => colorScale(d.key))

  // Add your text on the right-hand side

  svg
    .selectAll('.region-label')
    .data(nested)
    .enter()
    .append('text')
    .attr('class', function(d) {
      return d.key
    })
    // .attr('class', 'region-label')
    .text(function(d) {
      return d.key
    })
    .attr('x', width)
    .attr('y', function(d) {
      return yPositionScale(d.values[5].GiftAmount)
    })
    .attr('font-size', 12)
    .attr('dx', 5)
    .attr('dy', function(d) {
      if (d.key === 'CHINA') {
        return -2
      }
      if (d.key === 'SAUDI ARABIA') {
        return 6
      }
      return 3
    })

  // Add your title

  svg
    .append('text')
    .text("Market Shares for Meal Kit Companies")
    .attr('x', width / 2)
    .attr('y', -40)
    .attr('text-anchor', 'middle')
    .attr('font-size', 30)
/*
  svg
    .append('text')
    .text(
      'The top 5 countries with the biggest total sum of donations in 2012-2017'
    )
    .attr('x', width / 2)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .attr('font-size', 16)
*/
  
  // Add your axes

  var xAxis = d3
  .axisBottom(xPositionScale)
  .tickFormat(d3.timeFormat('%m/%Y'))
  //.tickValues([new Date("2012"), new Date("2013"), new Date("2014"),
   // new Date("2015"),new Date("2016"), new Date("2017")])


  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
  // .call(xAxis.ticks(d3.timeYear))

  // console.log(xPositionScale.domain())
  var yAxis = d3.axisLeft(yPositionScale)
 //.ticks(7)
  

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
}
export {
  xPositionScale,
  yPositionScale,
  colorScale,
 // line,
  width,
  height,
  parseTime
}
