import * as d3 from 'd3'

// Create your margins and height/width
var margin = { top: 100, left: 40, right: 30, bottom: 30 }

var height = 300 - margin.top - margin.bottom

var width = 200 - margin.left - margin.right

// I'll give you this part!
var container = d3.select('#chart-3')

// Create your scales

  var yPositionScale = d3.scaleBand()
  //.domain([2012, 2013, 2014, 2015, 2016, 2017])
  .range([height, 0])

  var widthScale = d3
    .scaleLinear()
    .domain([0, 200000000])
    .range([0, width])

/*
  var bar = d3
  .rect()
  .attr('fill', 'black')
      .attr('x', 0)
      .attr('y', function(d) {
        return yPositionScale(d.Year)
      })
      .attr('width', function(d) {
        return widthScale(d.GiftAmount)
      })
      .attr('height', yPositionScale.bandwidth())

*/
/*
var xPositionScale = d3
  .scaleLinear()
  .domain([2012, 2017])
  .range([0, width])
var yPositionScale = d3
  .scaleLinear()
  .domain([0, 200000000])
  .range([height, 0])

// Create your line generator

var line = d3
  .line()
  .x(function(d) {
    return xPositionScale(d.year)
  })
  .y(function(d) {
    return yPositionScale(d.GiftAmount)
  })
*/
// Read in your data

Promise.all([
  d3.csv(require('./data/gift_data_2012_2017.csv'))
])
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

// Create your ready function

function ready([datapoints]) {
  

  var years = datapoints.map(d => d.year)
  yPositionScale.domain(years)

  var nested = d3
    .nest()
    .key(function(d) {
      return d.Country
    })
    .entries(datapoints)
 // console.log(nested)
 



  container
    .selectAll('.gift-graph')
    .data(nested)
    .enter()
    .append('svg')
    .attr('class', 'gift-graph')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .each(function(d) {
      // which svg are we looking at?
      var svg = d3.select(this)
//console.log(nested)

      svg
        .selectAll('.bar')
   
        .data(function(d) {
          return d.values})
        .enter()
        .append('rect')
        .attr('class','bar')
        .attr('fill', 'salmon')
        .attr('x', 0)
      .attr('y', function(d,i) {
      //  console.log(d.values)
      // console.log(d.Year)
        return yPositionScale(d.year)
      })
      .attr('width', function(d,i) {
       // console.log(nested)
        return widthScale(d.GiftAmount)
      })
      .attr('height', yPositionScale.bandwidth())

      
      /*
      .attr('fill', function(d) {
        return colorScale(d['animal'])
      })
      */
/*
       svg
        .append('path')
        .datum(usa)
        .attr('d', line)
        .attr('stroke', 'grey')
        .attr('fill', 'none')
*/

 var ticks = [50000000,100000000,150000000,200000000]
 var tickLabels = [50,100,150,200]

      var xAxis = d3
        .axisBottom(widthScale)
        .tickValues(ticks)
        .tickFormat(function(d,i){return tickLabels[i] })


        //.ticks(4)
        //.tickFormat(d3.format(d/1000000))
        
        //.tickSize(-height)

      svg
        .append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

      var yAxis = d3
        .axisLeft(yPositionScale)
        //.tickValues([2012, 2013, 2014, 2015, 2016, 2017])
        //.tickSize(-width)
        //.ticks(6)
        //.tickFormat(d3.format("$,d"))


      svg
        .append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis)

      svg
        .selectAll('.tick line')
        .attr('stroke-dasharray', '2 2')
        .attr('stroke', 'lightgrey')

      svg.selectAll('.domain').remove()

      svg
        .append('text')
        .text(d.key)
        .attr('x', width / 2)
        .attr('y', 0)
        .attr('font-size', 12)
        .attr('dy', -12)
        .attr('text-anchor', 'middle')
        .attr('fill', 'red')
        .attr('font-weight', 'bold')
        //console.log(d.values[0].GiftAmount)


      svg
    .selectAll('.greybox')
    .data(nested)
    .enter()
    .append('rect')
    .attr('width', function (d) {
      console.log(d.values)
      return widthScale(200000000) - widthScale(150000000)
    })
    .attr('height', height)
    .attr('y', 0)
    //.attr('x', 100)
    .attr('x', function (d) {
      return widthScale(100000000)
    })
    .attr('fill', '#F2F3F4')
    .lower()

    })
}

//export { xPositionScale, yPositionScale, line, width, height }
