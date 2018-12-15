//FAT GRAPH

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
    .attr('opacity', d=>{
      if (d.company === 'Company2') {
        return  1
      } else {
        return 0
      }
      })
      .transition()
      .duration(1000)
      .attr('opacity', 1)
        
  })

    //THE SINGLE FATTIEST MEAL

    d3.select('#fattiest-meal').on('stepin', () => {
      svg
      .selectAll('.fattiestMeal')
      .style('visibility', 'visible')
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1)

 })
.on('stepout', () => {


      svg
      .selectAll('.fattiestMeal')
      .style('visibility', 'hidden')
    })



 }
