import {dropdownMenu} from './dropdownMenu'


(function (d3$1) {
    'use strict';
  
    const barChart = (selection, props) => {
        const {
        yValue,
           margin,
        width,
        height,
        data
      } = props;
      
        const innerWidth = width ;
      const innerHeight = height - margin.top - margin.bottom;
      
      const xScale = d3.scaleBand()
        .range([0, innerWidth])
        .domain(data.map((d) => d.category))
        .padding(0.3);
     
  
      const yScale = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain([0, d3.max(data, yValue)])
            .nice();
      
      const g = selection.selectAll('.contain').data([null]);
      const gEnter = g.enter().append('g')
      .attr('class', 'contain');
      
      gEnter
        .merge(g)
              .attr('transform',
                `translate(${margin.left},${margin.top})`
               );
      
      const xAxis = d3$1.axisBottom(xScale);
        
         const yAxis = d3$1.axisLeft(yScale)
          //.tickFormat(axisTickFormat)
        .tickSize(-innerWidth)
          .tickPadding(10);
      
      const yAxisG = g.select('.y-axis');
      const yAxisGEnter = gEnter
          .append('g')
              .attr('class', 'y-axis');
      yAxisG
          .merge(yAxisGEnter)
              .call(yAxis);
      
      yAxisG
        .merge(yAxisGEnter)
        .selectAll('.domain').remove();
      
     
      
      const xAxisG = g.select('.x-axis');
      const xAxisGEnter = gEnter
          .append('g')
              .attr('class', 'x-axis');
      xAxisG
          .merge(xAxisGEnter)
              .attr('transform', `translate(0, ${innerHeight})`)
              .call(xAxis)
          .selectAll('.tick text')
            .style('text-anchor', 'end')
              .attr("dx", "-.8em")
          .attr("dy", ".15em")
              .attr("transform", function(d) {
                    return "rotate(-30)" 
                    });
      
      xAxisG
        .merge(xAxisGEnter)
        .selectAll('.domain').remove();
      
    
       
      const rectangles = g.merge(gEnter).selectAll('rect').data(data);
      rectangles.enter().append('rect')
          .merge(rectangles)
  
          .attr('class', 'bar')
          .style("fill", function(d ) {          
            if (  d.value <= 10) {return "red"}  
            else if (d.value >= 30) {return "green"} // <== Right here 
            else { return "yellow" }             
        ;})                    
  
          .attr('x', d => xScale(d.category))
          .attr('y', d => yScale(yValue(d)))
          .attr('height', d => innerHeight - yScale(yValue(d)))
          .attr('width', xScale.bandwidth())
        .enter( (d) =>{ 
          if(rectangles.bar.value>20){
          return d. append('fill','red');
         }
         else{
         return rectangles.enter('fill',green);
         }
         });
      
      
      const barValueText = g.merge(gEnter).selectAll('.barValue').data(data);
      barValueText.enter().append('text')
          .attr('text-anchor', 'middle')
          .merge(barValueText)
              .attr('class', 'barValue')
              .attr('x', d => xScale(d.category) + xScale.bandwidth()/2)
          .attr('y', d => yScale(d.value) - 10)
          .text( d => `${d.value}`);
      
      /*const barValueText = barValueGEnter
          .append('text')
          .attr('class', 'barValue')
          .attr('text-anchor', 'middle')
          .merge(barValueG.select('.barValue'))
          .attr('x', a => xScale(a.category) + xScale.bandwidth() / 2)
          .attr('y', a => yScale(a.value) - 5)
          .text((a) => `${a.value}`)*/
    };
  
    const data = [{"category": "BJP", "value": 20},
                    {"category": "CONGRESS", "value": 10},
                 {"category": "ADMK", "value": 38},
                 {"category": "DMK", "value": 30},
                 {"category": "IID", "value": 15},
                 {"category": "LLP", "value": 5},
                 {"category": "HES", "value": 35},
                 {"category": "AES", "value": 50},
                 {"category": "S", "value": 35},
                 {"category": "M", "value": 45}];
  
    const svg = d3$1.select('svg');
  
    const width = +svg.attr('width');
    const height = +svg.attr('height');
  
    let yColumn = "value";
    let xColumn = "category";
  
   
    
    
    
    const render = () => {
      
      svg.call(barChart, {
          yValue: d => d[yColumn],
      
           margin: {top: 50, right: 0, bottom: 50, left: 40},
        width,
        height,
        data
      });
  
    };
  
    render();
  }(d3)) 
  
  