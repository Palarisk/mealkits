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