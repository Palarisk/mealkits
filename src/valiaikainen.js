TAVALLAAN TOIMII //FAT GRAPH

import * as d3 from 'd3'

const margin = {
  top: 50,
  right: 400,
  bottom: 30,
  left: 80
}

const width = 800 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 14])
  .range([0, width])

const yPositionScale = d3
  .scaleBand()
  .range([height, 0])
  .padding(0.25)


d3.csv(require('./data/fat.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(datapoints) {
  // Calculate the homicide rate per 10,000 people


  var companies = datapoints.map(d => d.company)
  yPositionScale.domain(companies)

// BASIS
  svg
    .selectAll('.company')

    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'company')
    .attr('x', 0)
    .attr('y', d => yPositionScale(d.company))
    .attr('height', yPositionScale.bandwidth())
    .attr('width', d => xPositionScale(d.fat))
    .attr('fill', d=>{
      if (d.company === 'Company2') {
        return  'red'
      } else {
        return 'grey'
      }
  })
    .style('visibility', 'hidden')

  svg
    .append('line')
    .attr('class', 'fat-line')
    .attr('x1', xPositionScale(7))
    .attr('y1', 0)
    .attr('x2', xPositionScale(7))
    .attr('y2', height)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()

    svg
    .append('text')
    .attr('font-size', '24')
    .attr('text-anchor', 'middle')
    .text('Fat content in a typical meal')
    .attr('x', width / 3)
    .attr('y', -30)
    .attr('dx', 40)

      svg
    .append('text')
    .attr('font-size', '16')
    .attr('text-anchor', 'middle')
    .text('Healthy level')
    .attr('x', xPositionScale(7))
    .attr('y', -5)
    

  var yAxis = d3.axisLeft(yPositionScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  var xAxis = d3.axisBottom(xPositionScale)

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

    svg
      .append('circle')
      .attr('class','fattiestMeal')
      .attr('r',10)
      .attr('fill','red')
      .attr('cy', 90) //yPositionScale(d.company === 'Company4'))
      .attr('cx', width+width)
      .style('visibility', 'hidden')

    svg
    .append('text')
    .attr('class','fattiestMeal')
    .attr('font-size', '16')
    .attr('text-anchor', 'end')
    .text('The fattiest meal:\ New York Style Steak:\ 23 g fat')
         .attr('x', width+width)
    .attr('y', 80)
    .attr('dx', 40)
    .style('visibility', 'hidden')

// EMPTY CHART
/*
  d3.select('#empty-fat').on('stepin', () => {
        svg
    .selectAll('.company')
    .style('visibility', 'hidden')

    })
*/
// FATTIEST COMPANY

    d3.select('#most-fat').on('stepin', () => {
    svg
      .selectAll('.company')
      
    .style('visibility', d=>{
      if (d.company === 'Company2') {
        return  'visible'
      } else {
        return 'hidden'
      }
  })
 
  })
    .on('stepout', () => {
      svg.selectAll('.company')
    .style('visibility', 'hidden')

      svg
      .selectAll('.fattiestMeal')
      .style('visibility', 'hidden')
  })
// ALL COMPANIES

    d3.select('#all-fat').on('stepin', () => {
    svg
      .selectAll('.company')
    .style('visibility', 'visible')
          .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1)
        
  })

    //THE SINGLE FATTIEST MEAL

    d3.select('#fattiest-meal').on('stepin', () => {
      svg
      .selectAll('.fattiestMeal')
      .style('visibility', 'visible')
 })
.on('stepout', () => {


      svg
      .selectAll('.fattiestMeal')
      .style('visibility', 'hidden')
    })



 }




TOIMII KOKONAAN!!!!



import * as d3 from 'd3'

// Set up margin/height/width

var margin = { top: 100, left: 100, right: 105, bottom: 80 }

var height = 700 - margin.top - margin.bottom

var width = 900 - margin.left - margin.right

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


//OR
//var series = stack(nested)

// Read in your housing price data

d3.csv(require('./data/MealKitShare_Ready.csv'))
  .then(ready)
  .catch(err => {
    //  console.log("The error is", err)
  })


// Write your ready function

function ready(datapoints) {
  // console.log('Data is', datapoints)
  // Convert your months to dates
console.log(datapoints)
//console.log(d.date)
  datapoints.forEach(d => {
    //d.date =Date.parse(d.date)
    d.date = parseTime(d.date)
    //console.log(d.datetime)
  })


let dateExtent = d3.extent(datapoints, d => d.date)
 //let months = datapoints.map(d => d.datetime)
  //console.log(d3.extent(months))
  //let gifts = datapoints.map(d => +d.GiftAmount)

  xPositionScale.domain(dateExtent)

  /*
 var nested = d3
    .nest()
    .key(d => d.Company)
    .entries(datapoints)
*/

var keys = Object.keys(datapoints[0]).filter(col => col !== 'date' )


var stack = d3.stack()
    .keys(keys)
    .order(d3.stackOrderDescending)
    //.offset(d3.stackOffsetNone)

var layers = stack(datapoints)
//console.log(layers)
  // Get a list of dates and a list of prices

  //yPositionScale.domain(d3.extent(gifts))
  // Group your data together
  // Draw your lines



  svg
    .selectAll('path')
    //.data(stack(datapoints))
    .data(layers)
    .enter()
    .append('path')
    //.attr('class', 'share-area')
    .attr('class', function(d) {
    //    console.log(series)
    //     console.log(d.key)
      return d.key
    })
    .attr('d', d => {
      // d.key on esim NYC ja d.values on noi kaikki datapoints
      // console.log(d)
      //console.log(d.Array)
      console.log(layers)
      
      return area(d)
    })
    //.attr('stroke', d => colorScale(d.key))
    //.attr('stroke-width', 2)
    .attr('fill', d => colorScale(d.key))
    //.lower()

  // Adding my circles
/*
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
*/

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



TOIMIII


import * as d3 from 'd3'

// Set up margin/height/width

var margin = { top: 100, left: 100, right: 105, bottom: 80 }

var height = 700 - margin.top - margin.bottom

var width = 900 - margin.left - margin.right

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


//OR
//var series = stack(nested)

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
    console.log(d.datetime)
  })
  //
 var nested = d3
    .nest()
    .key(d => d.Company)
    .entries(datapoints)

var stack = d3.stack()
    .keys(["Sunbasket", "Plated", "Marley Spoon", "Home Chef", "Hello Fresh","Green Chef","Blue Apron"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone)

var series = stack(nested)


var area = d3
.area(series)
.x(d => xPositionScale(d.datetime))
.y0(height)
.y1(d => yPositionScale(d.Share))

  // Get a list of dates and a list of prices



  let months = datapoints.map(d => d.datetime)
  //console.log(d3.extent(months))
  //let gifts = datapoints.map(d => +d.GiftAmount)

  xPositionScale.domain(d3.extent(months))

  //yPositionScale.domain(d3.extent(gifts))

  // Group your data together

 

  console.log(series)

  // Draw your lines



  svg
    .selectAll('.share-area')
    //.data(stack(datapoints))
    .data(nested)
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
/*
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
*/
  svg
    .append('text')
    .text("Market Shares") // for Meal Kit Companies")
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

******
import * as d3 from 'd3'

// Set up margin/height/width

var margin = { top: 100, left: 100, right: 105, bottom: 80 }

var height = 700 - margin.top - margin.bottom

var width = 900 - margin.left - margin.right

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


//OR
//var series = stack(nested)

// Read in your housing price data

d3.csv(require('./data/MealKitShare_Ready.csv'))
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
    console.log(d.datetime)
  })
  //
 var nested = d3
    .nest()
    .key(d => d.Company)
    .entries(datapoints)

var stack = d3.stack()
    .keys(["Sunbasket", "Plated", "Marley Spoon", "Home Chef", "Hello Fresh","Green Chef","Blue Apron"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone)

var series = stack(nested)


var area = d3
.area(series)
.x(d => xPositionScale(d.datetime))
.y0(height)
.y1(d => yPositionScale(d.Share))

  // Get a list of dates and a list of prices



  let months = datapoints.map(d => d.datetime)
  //console.log(d3.extent(months))
  //let gifts = datapoints.map(d => +d.GiftAmount)

  xPositionScale.domain(d3.extent(months))

  //yPositionScale.domain(d3.extent(gifts))

  // Group your data together

 

  console.log(series)

  // Draw your lines



  svg
    .selectAll('.share-area')
    //.data(stack(datapoints))
    .data(nested)
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
/*
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
*/
  svg
    .append('text')
    .text("Market Shares") // for Meal Kit Companies")
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



****
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
    console.log(d.datetime)
  })
  //

  // Get a list of dates and a list of prices

  let months = datapoints.map(d => d.datetime)
  console.log(d3.extent(months))
  //let gifts = datapoints.map(d => +d.GiftAmount)

  xPositionScale.domain(d3.extent(months))

  //yPositionScale.domain(d3.extent(gifts))

  // Group your data together

  var nested = d3
    .nest()
    .key(d => d.Company)
    .entries(datapoints)

  console.log(nested)

  // Draw your lines



  svg
    .selectAll('.share-area')
    //.data(stack(datapoints))
    .data(nested)
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
  line,
  width,
  height,
  parseTime
}


**********


//FAT DOTS

  svg.selectAll('point')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('r', '10')
    .attr('fill', 'red')
    .attr('cy', d => yPositionScale(d.company) + 0.1 * height)
    .attr('cx', d => xPositionScale('fat') + (xPositionScale('salt')-xPositionScale('fat'))/2)
    .style('visibility', d => {
    if (d.fat < 8) {
        return  'visible'
      } else {
        return 'hidden'
      }

    })


    //SALT DOTS

  svg.selectAll('point')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('r', '10')
    .attr('fill', 'red')
    .attr('cy', d => yPositionScale(d.company) + 0.1 * height)
    .attr('cx', d => xPositionScale('salt') + (xPositionScale('fiber')-xPositionScale('protein'))/2)
    .style('visibility', d => {
    if (d.salt < 601) {
        return  'visible'
      } else {
        return 'hidden'
      }

    })

    //SUGAR DOTS

  svg.selectAll('point')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('r', '10')
    .attr('fill', 'red')
    .attr('cy', d => yPositionScale(d.company) + 0.1 * height)
    .attr('cx', d => xPositionScale('sugar') + (xPositionScale('fiber')-xPositionScale('protein'))/2)
    .style('visibility', d => {
    if (d.sugar < 5) {
        return  'visible'
      } else {
        return 'hidden'
      }

    })
     .style('visibility', 'visible')
        .attr('fill', d=>{
      if (d.company === 'Company3') {
        return  'red'
      } else {
        return 'grey'
      }
  })

    //PROTEIN DOTS

  svg.selectAll('point')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('r', '10')
    .attr('fill', 'red')
    .attr('cy', d => yPositionScale(d.company) + 0.1 * height)
    .attr('cx', d => xPositionScale('protein') + (xPositionScale('fiber')-xPositionScale('protein'))/2)
    .style('visibility', d => {
    if (d.protein > 2) {
        return  'visible'
      } else {
        return 'hidden'
      }

    })
     .style('visibility', 'visible')
        .attr('fill', d=>{
      if (d.company === 'Company3') {
        return  'red'
      } else {
        return 'grey'
      }
  })

//FIBER DOTS

  svg.selectAll('point')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('r', '10')
    .attr('fill', 'red')
    .attr('cy', d => yPositionScale(d.company) + 0.1 * height)
    .attr('cx', d => xPositionScale('fiber') + (xPositionScale('fiber')-xPositionScale('protein'))/2)
    .style('visibility', d => {
    if (d.fiber > 8) {
        return  'visible'
      } else {
        return 'hidden'
      }

    })

***********

 svg.selectAll('point')
    .attr('fill', 'grey')

  svg.selectAll('point')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('r', '10')
    .attr('fill', d => {
      if (d.company === Company5) {
        return 'red'
      } else {
        return 'grey'
      }

    })
    .attr('cy', d => yPositionScale(d.company) + 0.1 * height)
    .attr('cx', d => xPositionScale('protein') + (xPositionScale('fiber')-xPositionScale('protein'))/2)
    .style('visibility', d => {
    if (d.protein > 2) {
        return  'visible'
      } else {
        return 'hidden'
      }

    })