d3.custom = {};

d3.custom.barChart = function module() {
    var margin = {top: 20, right: 20, bottom: 200, left: 80},
    // width is either the width of the chart container, or 1000px, whichever is less
        width = d3.min([parseInt(d3.select('#chart').style('width')), 1000]),
        height = 600,
        gap = 0,
        ease = 'cubic-in-out',
        xLabel = '',
        yLabel = '',
        tickFormat = '';
    var svg, duration = 500;

    var dispatch = d3.dispatch('customMouseEnter', 'customMouseLeave');
    function exports(_selection) {
        _selection.each(function(_data) {

            // set the chart height and width as functions of the margins
            var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom;

            // create the x axis scale
            var x1 = d3.scale.ordinal()
                .domain(_data.map(function(d) { return d.county; }))
                .rangeRoundBands([0, chartW], 0.1);

            // create the y axis scale
            var y1 = d3.scale.linear()
                .domain([0, d3.max(_data, function(d) { return d.datum; })])
                .range([chartH, 0]);

            // create the x axis
            var xAxis = d3.svg.axis()
                .scale(x1)
                .orient('bottom');

            // determine the number of y axis ticks based on the highest number in the data set, or 10, whichever is less
            var numTicks = d3.min([10, d3.max(_data, function(d) { return d.datum; })]);

            // create the y axis
            var yAxis = d3.svg.axis()
                .scale(y1)
                .orient('left')
                .ticks(numTicks, tickFormat);

            // start building the svg image
            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
            }

            // add the transition animations
            svg.transition().duration(duration).attr({width: width, height: height});
            svg.select('.container-group')
                .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

            // remove previous labels
            svg.selectAll('.axis-label').remove();

            // add the x axis with labels
            svg.select('.x-axis-group.axis')
                .transition()
                    .duration(duration)
                    .ease(ease)
                    .attr({transform: 'translate(0,' + (chartH) + ')'})
                    .call(xAxis)
                .selectAll('text:not(.axis-label)')
                    .attr("transform", "rotate(-65)")
                    .attr('dx', '-0.8em')
                    .attr('dy', '0.15em')
                    .style('text-anchor', 'end');

            // add the x axis label
            svg.select('.x-axis-group.axis')
                .append('text')
                    .attr('class', 'axis-label')
                    .attr('x', chartW / 2)
                    .attr('y', 175)
                    .style('font-weight', 'bold')
                    .style('text-anchor', 'middle')
                    .text(xLabel);

            // add the y axis
            svg.select('.y-axis-group.axis')
                .transition()
                    .duration(duration)
                    .ease(ease)
                    .call(yAxis);

            // add the y axis label
            svg.select('.y-axis-group.axis')
                .append("text")
                    .attr('class', 'axis-label')
                    .attr("transform", "rotate(-90)")
                    .attr("y", -80)
                    .attr('x', -(chartH / 2))
                    .attr("dy", ".71em")
                    .style('font-weight', 'bold')
                    .style("text-anchor", "middle")
                    .text(yLabel);

            var gapSize = x1.rangeBand() / 100 * gap;

            // determine the width of the bar based on the x axis scale function
            var barW = x1.rangeBand() - gapSize;

            // add the bars
            var bars = svg.select('.chart-group')
                .selectAll('.bar')
                .data(_data);
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({x: chartW,
                    width: barW,
                    y: function(d) { return y1(d.datum); },
                    height: function(d) { return chartH - y1(d.datum); }
                })
                // externalize the mouse over functionality
                .on('mouseenter', dispatch.customMouseEnter)
                .on('mouseleave', dispatch.customMouseLeave);

            // add transition animations to the bars
            bars.transition()
                .duration(duration)
                .ease(ease)
                .attr({
                    width: barW,
                    x: function(d) { return x1(d.county) + gapSize / 2; },
                    y: function(d) { return y1(d.datum); },
                    height: function(d) { return chartH - y1(d.datum); }
                });
            bars.exit().transition().style({opacity: 0}).remove();

            duration = 500;
        });
    }

    // external setter functions
    exports.width = function(_x) {
        if (!arguments.length) { return width; }
        width = parseInt(_x);
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) { return height; }
        height = parseInt(_x);
        duration = 0;
        return this;
    };
    exports.gap = function(_x) {
        if (!arguments.length) { return gap; }
        gap = _x;
        return this;
    };
    exports.ease = function(_x) {
        if (!arguments.length) { return ease; }
        ease = _x;
        return this;
    };
    exports.xLabel = function(_x) {
        if (!arguments.length) { return xLabel; }
        xLabel = _x;
        return this;
    };
    exports.yLabel = function(_y) {
        if (!arguments.length) { return yLabel; }
        yLabel = _y;
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};
