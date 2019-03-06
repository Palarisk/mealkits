

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
  .select('#all-scrolly')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 80])
  .range([0, width])

const yPositionScale = d3
  .scaleBand()
  .range([height, 0])
  .padding(0.25)


d3.csv(require('./data/medians_hf_sb_ba_pl_ms_12weeks_transposed.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(datapoints) {


  var nutrients = datapoints.map(d => d.nutrient)
  yPositionScale.domain(nutrients)

// BASIS
  svg
    .selectAll('.nutrient')

    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'nutrient')
    .attr('x', 0)
    .attr('y', d => yPositionScale(d.nutrient))
    .attr('height', yPositionScale.bandwidth())
    .attr('width', d => xPositionScale(d.median))
    .attr('fill', d=>{
      if ((d.nutrient === 'calories_pct')||(d.nutrient === 'sat_fat_pct')) {
        return  'lightgreen'
      } else {
        return 'tomato'
      }
  })
    .style('visibility', 'visible')

  svg
    .append('rect')
    .attr('x', xPositionScale(30))
    .attr('y', 0)
    .attr('width', xPositionScale(10))
    .attr('height', height)
    .attr('fill', 'lightgrey')
    .lower()

    svg
    .append('text')
    .attr('font-size', '24')
    .attr('text-anchor', 'middle')
    .text('Overall results for the companies')
    .attr('x', width / 3)
    .attr('y', -30)
    .attr('dx', 40)

      svg
    .append('text')
    .attr('font-size', '16')
    .attr('text-anchor', 'middle')
    .text('Recommended level')
    .attr('x', xPositionScale(35))
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
      .attr('cy', 90) //yPositionScale(d.nutrient === 'nutrient4'))
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
    .selectAll('.nutrient')
    .style('visibility', 'hidden')

    })
*/
// CALORIES CALORIES CALORIES CALORIES CALORIES CALORIES

    d3.select('#calories').on('stepin', () => {
    svg
      .selectAll('.nutrient')
      
    .style('visibility', d=>{
      if (d.nutrient === 'calories_pct') {
        return  'visible'
      } else {
        return 'hidden'
      }
  })
 
  })
    .on('stepout', () => {
      svg.selectAll('.nutrient')
    .style('visibility', 'hidden')

      svg
      .selectAll('.fattiestMeal')
      .style('visibility', 'hidden')
  })
// PROTEIN PROTEIN PROTEIN PROTEIN PROTEIN PROTEIN PROTEIN PROTEIN

    d3.select('#protein').on('stepin', () => {
    svg
      .selectAll('.nutrient')
    .style('visibility', 'visible')
    .attr('opacity', d=>{
      if (d.nutrient === 'calories_pct') {
        return  1
      } else {
        return 0
      }
      })
      .transition()
      .duration(1000)
      .attr('opacity', d=>{
      if (d.nutrient === 'calories_pct') {
        return  1
      } 
      if (d.nutrient === 'prot_pct') {
        return 1
      }
      else
        return 0
      })
        
  })
// FAT FAT FAT
        d3.select('#fat').on('stepin', () => {
    svg
      .selectAll('.nutrient')
    .style('visibility', 'visible')
    .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct')){
        return  1
      }
      else {
        return 0
      }
      })
      .transition()
      .duration(1000)
      .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct')){
        return  1
      } 
      if (d.nutrient === 'fat_pct') {
        return 1
      }
      else
        return 0
      })
        
  })

// SAT_FAT SAT_FAT SAT_FAT
        d3.select('#sat_fat').on('stepin', () => {
     svg
      .selectAll('.nutrient')
    .style('visibility', 'visible')
    .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct') || (d.nutrient === 'fat_pct')){
        return  1
      }
      else {
        return 0
      }
      })
      .transition()
      .duration(1000)
      .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct') || (d.nutrient === 'fat_pct')){
        return  1
      } 
      if (d.nutrient === 'sat_fat_pct') {
        return 1
      }
      else
        return 0
      })
        
  })

// FIBER FIBER FIBER
        d3.select('#fiber').on('stepin', () => {
     svg
      .selectAll('.nutrient')
    .style('visibility', 'visible')
    .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct') || (d.nutrient === 'fat_pct') || (d.nutrient === 'sat_fat_pct')){
        return  1
      }
      else {
        return 0
      }
      })
      .transition()
      .duration(1000)
      .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct') || (d.nutrient === 'fat_pct') || (d.nutrient === 'sat_fat_pct')){
        return  1
      } 
      if (d.nutrient === 'fiber_pct') {
        return 1
      }
      else
        return 0
      })
        
  })

// CARB CARB CARB CARB
        d3.select('#carb').on('stepin', () => {
     svg
      .selectAll('.nutrient')
    .style('visibility', 'visible')
    .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct') || (d.nutrient === 'fat_pct') || (d.nutrient === 'sat_fat_pct') || (d.nutrient === 'fiber_pct')){
        return  1
      }
      else {
        return 0
      }
      })
      .transition()
      .duration(1000)
      .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct') || (d.nutrient === 'fat_pct') || (d.nutrient === 'sat_fat_pct') || (d.nutrient === 'fiber_pct')){
        return  1
      } 
      if (d.nutrient === 'carb_pct') {
        return 1
      }
      else
        return 0
      })
        
  })

// SALT SALT SALT SALT 
        d3.select('#salt').on('stepin', () => {
     svg
      .selectAll('.nutrient')
    .style('visibility', 'visible')
    .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct') || (d.nutrient === 'fat_pct') || (d.nutrient === 'sat_fat_pct') || (d.nutrient === 'fiber_pct') || (d.nutrient === 'carb_pct')){
        return  1
      }
      else {
        return 0
      }
      })
      .transition()
      .duration(1000)
      .attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct') || (d.nutrient === 'prot_pct') || (d.nutrient === 'fat_pct') || (d.nutrient === 'sat_fat_pct') || (d.nutrient === 'fiber_pct') || (d.nutrient === 'carb_pct')){
        return  1
      } 
      if (d.nutrient === 'salt') {
        return 1
      }
      else
        return 0
      })
        
  })

    //THE SINGLE FATTIEST MEAL

    d3.select('').on('stepin', () => {
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
