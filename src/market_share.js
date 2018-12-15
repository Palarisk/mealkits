import * as d3 from 'd3'

// Set up margin/height/width

var margin = { top: 100, left: 40, right: 115, bottom: 80 }

var height = 500 - margin.top - margin.bottom

var width = 750 - margin.left - margin.right

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

var area = d3
  .area()
  .x(d => xPositionScale(d.data.date))
  .y0(d => yPositionScale(d[0]))
  .y1(d => yPositionScale(d[1]))

let colorScale = d3.scaleOrdinal().range([
  '#a6cee3', // 1
  '#fb9a99', // 2
  '#e31a1c', // 3
  '#fdbf6f', // 4

  '#33a02c', // 5
  '#b2df8a', // 6
  '#1f78b4', // 7
  '#cab2d6',
  '#ff7f00',

  '#6a3d9a'
])

d3.csv(require('./data/MealKitShare_Ready.csv'))
  .then(ready)
  .catch(err => {
    //  console.log("The error is", err)
  })

// Write your ready function

function ready(datapoints) {
  // console.log('Data is', datapoints)
  // Convert your months to dates
  //console.log(datapoints)
  // console.log(d.date)
  datapoints.forEach(d => {
    // d.date =Date.parse(d.date)
    d.date = parseTime(d.date)
    // console.log(d.datetime)
  })

  let dateExtent = d3.extent(datapoints, d => d.date)
  //console.log(dateExtent)
  xPositionScale.domain(dateExtent)

  var keys = Object.keys(datapoints[0]).filter(col => col !== 'date')

  var stack = d3
    .stack()
    .keys(keys)
    .order(d3.stackOrderReverse)
  // .offset(d3.stackOffsetNone)

  var layers = stack(datapoints)
  // console.log(layers)

  // BLUE APRON

  svg
    .selectAll('blue_path')
    .data(layers)
    .enter()
    .append('path')
    // .attr('class', 'share-area')
    .attr('class', function(d) {
      //console.log(d.key)
      return d.key
    })
    .attr('d', d => {
      console.log(layers)
      if (d.key === 'Blue Apron') {
        return area(d)
      }
    })
    // .attr('stroke', d => colorScale(d.key))
    // .attr('stroke-width', 2)
    .attr('fill', d => colorScale(d.key))
  // .lower()

  // HELLO FRESH

  d3.select('#hello-fresh')
    .on('stepin', () => {
      svg
        .selectAll('hello_path')
        .data(layers)
        .enter()
        .append('path')
        .attr('class', function(d) {
          return d.key
        })
        .attr('class', 'hello_path')
        .attr('d', d => {
          if (d.key === 'Hello Fresh') {
            return area(d)
          }
        })
        // .attr('stroke', d => colorScale(d.key))
        // .attr('stroke-width', 2)
        .attr('fill', d => colorScale(d.key))
        .attr('opacity', 0)
        .transition()
        .duration(1000)
        .attr('opacity', 1)
    })

    .on('stepout', () => {
      svg.selectAll('.hello_path').style('visibility', 'hidden')
    })

  // GREEN CHEF

  d3.select('#green-chef')
    .on('stepin', () => {
      svg
        .selectAll('green_path')
        .data(layers)
        .enter()
        .append('path')
        // .attr('class', 'share-area')
        .attr('class', function(d) {
          return d.key
        })
        .attr('class', 'green_path')

        .attr('d', d => {
          if (d.key === 'Green Chef') {
            return area(d)
          }
        })
        // .attr('stroke', d => colorScale(d.key))
        // .attr('stroke-width', 2)
        .attr('fill', d => colorScale(d.key))
    })
    .on('stepout', () => {
      svg.selectAll('.green_path').style('visibility', 'hidden')
    })

  // THE REST

  d3.select('#rest')
    .on('stepin', () => {
      svg
        .selectAll('rest_path')
        .data(layers)
        .enter()
        .append('path')
        // .attr('class', 'share-area')
        .attr('class', function(d) {
          return d.key
        })
        .attr('class', 'rest_path')
        .transition(1000)
        .attr('d', d => {
          return area(d)
        })
        // .attr('stroke', d => colorScale(d.key))
        // .attr('stroke-width', 2)
        .attr('fill', d => colorScale(d.key))

      var legend = svg
        .selectAll('.legend')
        .data(keys.slice()) // .reverse())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          return 'translate(55,' + i * 20 + ')'
        })

      legend
        .append('rect')
        .attr('x', width - 50)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', d => colorScale(d))
        .style('stroke', 'grey')

      legend
        .append('text')
        .attr('x', width - 36)
        .attr('y', 6)
        .attr('dy', '.35em')
        .style('text-anchor', 'start')
        .text(function(d) {
          return d
        })

      svg.selectAll('.legend').style('visibility', 'visible')
    })
    .on('stepout', () => {
      svg.selectAll('.rest_path').style('visibility', 'hidden')

      svg.selectAll('.legend').style('visibility', 'hidden')
    })

  // ***********
/*
  // Adding my circles
Älä tee sillee ku tossa alla yritin ja sillee ku tein lopputyössä, vaan jotenkin tälleen,
tässä Soman koodiesimerkki:

selected = datapoints.filter(d => {
  return (d.month === "Jan" && d.percent == 34) || (d.month == "Apr" && d.percent == 33)
}

d3.append('g')
  .selectAll('circle')
  .data(selected)
  .enter().append('circle')
  ....etc

selected = [datapoints[0], datapoints[20], datapoints[99], datapoints[304]]
*/
/*
  svg
    .selectAll('.last-circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', function(d) {
      return d.key
    })
    // .attr('class', 'last-circle')
    .attr('r', 6)
    //.attr('cx', 50)
    
    .attr('cx', function(d) {
     return xPositionScale(d.data[9].date)
     })
    
    .attr('cy', 50)
    // function(d) {
    // return yPositionScale(d.values[5].GiftAmount)
    // })
    .attr('fill', d => colorScale(d.key))
*/
  // Add your text on the right-hand side
  /*
  svg
    .selectAll('.region-label')
    .data(layers)
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
      return yPositionScale(d[43])
    })
    */
  /*
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
*/

  svg
    .append('text')
    .text('Market Shares for Meal Kit Companies')
    .attr('x', width / 2)
    .attr('y', -40)
    .attr('text-anchor', 'middle')
    .attr('font-size', 30)

  svg
    .append('text')
    .text('Source: Earnest Research')
    .attr('x', 70)
    .attr('y', height + 40)
    .attr('text-anchor', 'middle')
    .attr('font-size', 12)

  // Add your axes

  var xAxis = d3.axisBottom(xPositionScale).tickFormat(d3.timeFormat('%m/%Y'))
  // .tickValues([new Date("2012"), new Date("2013"), new Date("2014"),
  // new Date("2015"),new Date("2016"), new Date("2017")])

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
  // .call(xAxis.ticks(d3.timeYear))

  // console.log(xPositionScale.domain())
  var yAxis = d3.axisLeft(yPositionScale).tickFormat(d => {
    if (+d === 100) {
      return d + ' %'
    } else {
      return d
    }
  })
  // .ticks(7)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
}
