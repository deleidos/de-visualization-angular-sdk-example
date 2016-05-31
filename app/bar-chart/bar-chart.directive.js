(function (d3) {
    "use strict";

    angular.module('sdk-example.barChart')
        .directive('barChart', barChartDirective);

    barChartDirective.$inject = ['viewportUtils'];
    function barChartDirective(viewportUtils) {
        var chart = d3.custom.barChart();

        return {
            restrict: 'E',
            replace: true,
            template: '<div class="chart"></div>',
            scope:{
                data: '=data',
                mouseenter: '&mouseenter',
                mouseleave: '&mouseleave'
            },
            link: function(scope, element) {
                var chartEl = d3.select(element[0]);
                chart.on('customMouseEnter', function(d) {
                    scope.mouseenter({args:d});
                });

                chart.on('customMouseLeave', function(d) {
                    scope.mouseleave({args:d});
                });

                // change the chart width in response to the viewport size
                viewportUtils.watchWindowSize(scope, function () {
                    var width = d3.min([parseInt(d3.select('#chart').style('width')), 1000]);
                    chartEl.call(chart.width(width));
                });

                // update the chart when the data changes
                scope.$watchCollection('data', function (newVal) {
                    var dataIndex = scope.$parent.$parent.dataIndex;
                    var metaData = scope.$parent.$parent.rawData.meta.view.columns;

                    var xLabel = metaData[8].name;
                    var yLabel = metaData[dataIndex].name;

                    chartEl.datum(newVal).call(chart);
                    console.log(scope.$parent.$parent);
                    chartEl.call(chart.xLabel(xLabel));
                    chartEl.call(chart.yLabel(yLabel));
                });
            }
        };
    }
})(d3);
