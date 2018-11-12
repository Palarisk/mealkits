import * as d3 from 'd3'

const margin = {
  top: 100,
  right: 400,
  bottom: 30,
  left: 80
}

const width = 800 - margin.left - margin.right
const height = 450 - margin.top - margin.bottom

const svg = d3
  .select('#chart3')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleBand()
  .domain(['fat','salt','sugar','protein', 'fiber'])
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

//VERTICAL LINES
  svg
    .append('line')
    .attr('class', 'salt-line')
    .attr('x1', xPositionScale('salt'))
    .attr('y1', 0)
    .attr('x2', xPositionScale('salt'))
    .attr('y2', height)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()

  svg
    .append('line')
    .attr('class', 'sugar-line')
    .attr('x1', xPositionScale('sugar'))
    .attr('y1', 0)
    .attr('x2', xPositionScale('sugar'))
    .attr('y2', height)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()

  svg
    .append('line')
    .attr('class', 'protein-line')
    .attr('x1', xPositionScale('protein'))
    .attr('y1', 0)
    .attr('x2', xPositionScale('protein'))
    .attr('y2', height)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()

  svg
    .append('line')
    .attr('class', 'fiber-line')
    .attr('x1', xPositionScale('fiber'))
    .attr('y1', 0)
    .attr('x2', xPositionScale('fiber'))
    .attr('y2', height)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()

//HORIZONTAL LINES

  svg
    .append('line')
    .attr('class', 'fat-line')
    .attr('y1', yPositionScale('Company1'))
    .attr('x1', 0)
    .attr('y2', yPositionScale('Company1'))
    .attr('x2', width)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()


    svg
    .append('line')
    .attr('class', 'fat-line')
    .attr('y1', yPositionScale('Company2'))
    .attr('x1', 0)
    .attr('y2', yPositionScale('Company2'))
    .attr('x2', width)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()

      svg
    .append('line')
    .attr('class', 'fat-line')
    .attr('y1', yPositionScale('Company3'))
    .attr('x1', 0)
    .attr('y2', yPositionScale('Company3'))
    .attr('x2', width)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()

      svg
    .append('line')
    .attr('class', 'fat-line')
    .attr('y1', yPositionScale('Company4'))
    .attr('x1', 0)
    .attr('y2', yPositionScale('Company4'))
    .attr('x2', width)
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .lower()





    svg
    .append('text')
    .attr('font-size', '24')
    .attr('text-anchor', 'middle')
    .text('Overall healthiness')
    .attr('x', width / 3)
    .attr('y', -40)
    .attr('dx', 40)

        svg
    .append('text')
    .attr('font-size', '16')
    .attr('text-anchor', 'middle')
    .text('Which companies meet the recommendations?')
    .attr('x', width / 3)
    .attr('y', -20)
    .attr('dx', 40)

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

// HEALTHIEST STEP

    d3.select('#healthiest').on('stepin', () => {

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
    if (d.fat < 8 && d.company === 'Company4')  {
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
    if (d.salt < 601 && d.company === 'Company4') {
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
    if (d.sugar < 5 && d.company === 'Company4') {
        return  'visible'
      } else {
        return 'hidden'
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
    if (d.protein > 2 && d.company === 'Company4') {
        return  'visible'
      } else {
        return 'hidden'
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
    if (d.fiber > 8 && d.company === 'Company4') {
        return  'visible'
      } else {
        return 'hidden'
      }

    })

 
  })


// ALL COMPANIES

    d3.select('#healthiestAll').on('stepin', () => {
  
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
    if (d.fat < 8)  {
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

   
  })
        .on('stepout', () => {
      svg.selectAll('.point')
    .style('visibility', 'hidden')

     
  })


// LEAST HEALTHY


    d3.select('#LeastHealthy').on('stepin', () => {


//FAT DOTS

  svg.selectAll('point')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('r', '10')
    
    .attr('cy', d => yPositionScale(d.company) + 0.1 * height)
    .attr('cx', d => xPositionScale('fat') + (xPositionScale('salt')-xPositionScale('fat'))/2)
    .style('visibility', d => {
    if (d.fat < 8)  {
        return  'visible'
      } else {
        return 'hidden'
      }

    })
    .attr('fill', d => {
      if (d.company === 'Company5') {
        return 'red'
      } else {
        return 'grey'
      }

    })


    //SALT DOTS

  svg.selectAll('point')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('r', '10')

    .attr('cy', d => yPositionScale(d.company) + 0.1 * height)
    .attr('cx', d => xPositionScale('salt') + (xPositionScale('fiber')-xPositionScale('protein'))/2)
    .style('visibility', d => {
    if (d.salt < 601) {
        return  'visible'
      } else {
        return 'hidden'
      }

    })
    .attr('fill', d => {
      if (d.company === 'Company5') {
        return 'red'
      } else {
        return 'grey'
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
        .attr('fill', d => {
      if (d.company === 'Company5') {
        return 'red'
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
        .attr('fill', d => {
      if (d.company === 'Company5') {
        return 'red'
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
        .attr('fill', d => {
      if (d.company === 'Company5') {
        return 'red'
      } else {
        return 'grey'
      }

    })

   
  })


 
 }
