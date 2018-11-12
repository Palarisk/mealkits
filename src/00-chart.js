import * as d3 from 'd3'

const margin = { top: 0, left: 80, right: 20, bottom: 100 }

const height = 400 - margin.top - margin.bottom
const width = 400 - margin.left - margin.right

const svg = d3
  .select('#chart-10')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 15])
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
    .attr('width', d => xPositionScale(d.fat))
    .style('visibility', 'hidden')


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


/*

  d3.select('#step-homicides-2017').on('stepin', () => {
    xPositionScale.domain([0, 1000])
    svg
      .select('.x-axis')
      .transition()
      .call(xAxis)

    // Sort the cities based on homicides
    var sorted = datapoints.sort((a, b) => {
      return b.homicides_2017 - a.homicides_2017
    })

    // Pull out the ordered names,
    // feed them to the scale
    var cityNames = sorted.map(d => d.city)
    yPositionScale.domain(cityNames)

    // Update our y axis
    svg
      .select('.y-axis')
      .transition()
      .call(yAxis)

    // Update our bars based on both updated scales
    svg
      .selectAll('.city')
      .transition()
      .attr('y', d => yPositionScale(d.city))
      .attr('width', d => xPositionScale(d.homicides_2017))
  })

  d3.select('#step-homicides-2016').on('stepin', () => {
    xPositionScale.domain([0, 1000])
    svg
      .select('.x-axis')
      .transition()
      .call(xAxis)

    // Sort the cities based on homicides
    var sorted = datapoints.sort((a, b) => {
      return b.homicides_2016 - a.homicides_2016
    })

    // Pull out the ordered names,
    // feed them to the scale
    var cityNames = sorted.map(d => d.city)
    yPositionScale.domain(cityNames)

    // Update our y axis
    svg
      .select('.y-axis')
      .transition()
      .call(yAxis)

    // Update our bars based on both updated scales
    svg
      .selectAll('.city')
      .transition()
      .attr('y', d => yPositionScale(d.city))
      .attr('width', d => {
        return xPositionScale(d.homicides_2016)
      })
  })

  d3.select('#rate-2016').on('click', () => {
    // Update the scale to reflect
    // 0-10 homicides per 10k people
    xPositionScale.domain([0, 10])
    svg
      .select('.x-axis')
      .transition()
      .call(xAxis)

    svg
      .selectAll('.city')
      .transition()
      .attr('width', d => {
        return xPositionScale(d.rate_2016)
      })
  })

  d3.select('#rate-2017').on('click', () => {
    // Update the scale to reflect
    // 0-10 homicides per 10k people
    xPositionScale.domain([0, 10])
    svg
      .select('.x-axis')
      .transition()
      .call(xAxis)

    svg
      .selectAll('.city')
      .transition()
      .attr('width', d => {
        return xPositionScale(d.rate_2017)
      })
  })

  d3.select('#highlight-mass').on('click', () => {
    // when you use .classed, if the function
    // returns TRUE then the class is applied
    // to that element
    d3.selectAll('.city').classed('highlighted', d => {
      return d.had_mass_shooting === 'yes'
    })
  })

  d3.select('#toggle-mass').on('click', () => {
    console.log('I was clicked!')

    // I only want datapoints that have
    // not had a mass shooting
    var filtered = datapoints.filter(d => {
      return d.had_mass_shooting === 'no'
    })

    var cityNames = filtered.map(d => d.city)
    yPositionScale.domain(cityNames)
    svg.select('.y-axis').call(yAxis)

    // Attach our changed data
    svg
      .selectAll('.city')
      .data(filtered)
      .exit().remove()

    svg.selectAll('.city')
      .transition()
      .attr('y', d => yPositionScale(d.city))
      .attr('height', yPositionScale.bandwidth())

  })

  */
}