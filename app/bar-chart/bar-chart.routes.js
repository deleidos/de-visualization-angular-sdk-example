(function () {
    "use strict";

    angular.module('sdk-example.barChart')
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/bar-chart', {
                templateUrl: 'bar-chart/bar-chart.html',
                controller: 'sdk-example.barChart.BarChartController'
            });
    }
})();
