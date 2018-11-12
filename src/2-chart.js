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
  .select('#chart2')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 1000])
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

  svg
    .selectAll('.company')

    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'company')
    .attr('x', 0)
    .attr('y', d => yPositionScale(d.company))
    .attr('height', yPositionScale.bandwidth())
    .attr('width', d => xPositionScale(d.salt))
    .style('visibility', 'hidden')
    .transition()

  svg
    .append('line')
    .attr('class', 'salt-line')
    .attr('x1', xPositionScale(800))
    .attr('y1', 0)
    .attr('x2', xPositionScale(800))
    .attr('y2', height)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()

    svg
    .append('text')
    .attr('font-size', '24')
    .attr('text-anchor', 'middle')
    .text('Salt content in a typical meal')
    .attr('x', width / 3)
    .attr('y', -30)
    .attr('dx', 40)

      svg
    .append('text')
    .attr('font-size', '16')
    .attr('text-anchor', 'middle')
    .text('Healthy level')
    .attr('x', xPositionScale(800))
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


    d3.select('#most-salt').on('stepin', () => {
    svg
      .selectAll('.company')
      .transition()
      .attr('fill','red')
    .style('visibility', d=>{
      if (d.company === 'Company3' | d.company === 'Company5') {
        return  'visible'
      } else {
        return 'hidden'
      }
  })
 
  })
        .on('stepout', () => {
      svg.selectAll('.company')
    .style('visibility', 'hidden')

     
  })

    d3.select('#all-salt').on('stepin', () => {
    svg
      .selectAll('.company')

    .style('visibility', 'visible')
        .attr('fill', d=>{
      if (d.company === 'Company3' | d.company === 'Company5') {
        return  'red'
      } else {
        return 'grey'
      }
  })
  })

    d3.select('#saltiest-meal').on('stepin', () => {
      svg
      .append('circle')
      .attr('class','saltiestMeal')
      .attr('r',10)
      .attr('fill','red')
      .attr('cy', 160) //yPositionScale(d.company === 'Company4'))
      .attr('cx', width+width)

         svg
    .append('text')
    .attr('class','saltiestMeal')
    .attr('font-size', '16')
    .attr('text-anchor', 'end')
    .text('The Salttiest meal:\ Fish with XXX: 2000mg')
         .attr('x', width+width)
    .attr('y', 150)
    .attr('dx', 40)


    })
    .on('stepout', () => {


      svg
      .selectAll('.saltiestMeal')
      .style('visibility', 'hidden')
    })



 }
