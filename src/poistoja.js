.attr('opacity', d=>{
      if ((d.nutrient === 'calories_pct'|| 'prot_pct')){
        return  1
      }
      else {
        return 0
      }
      })


***

 .attr('opacity', d=>{
      if (d.nutrient === 'calories_pct')    {
        return  1
      }
      if (d.nutrient === 'prot_pct')   {
        return  1
      } else {
        return 0
      }
      })


*********

   d3.select('#fat').on('stepin', () => {
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