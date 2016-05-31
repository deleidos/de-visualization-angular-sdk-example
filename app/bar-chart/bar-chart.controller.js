(function () {
    "use strict";

    angular.module('sdk-example.barChart')
        .controller('sdk-example.barChart.BarChartController', BarChartController);

    BarChartController.$inject = ['$scope', 'sdk-example.barChart.countyDataService'];
    function BarChartController($scope, countyDataService) {
        // retrieve the MD county education data
        countyDataService.getEducationData()
            .then(function (successData) {
                $scope.rawData = successData.data;
            }, function (faultData) {
                console.log(faultData);
            });

        // helper function to update the data
        function updateData(rawData, dataIndex) {
            var data = [];
            for (var i = 0; i < rawData.data.length - 4; i++) {
                data.push({county: rawData.data[i][8], datum: +rawData.data[i][dataIndex]});
            }

            $scope.dataType = rawData.meta.view.columns[dataIndex].dataTypeName;
            $scope.data = $scope.sort(data, $scope.sortMethod);
        }

        // display the bar value on mouse over
        $scope.mouseenter = function (d) {
            $scope.barValue = d.datum;
            $scope.$apply();
        };

        // remove the bar value on mouse leave
        $scope.mouseleave = function () {
            delete $scope.barValue;
            $scope.$apply();
        };

        // update the data when a new data set is selected
        $scope.$watch('dataIndex', function (dataIndex) {
            delete $scope.barValue;
            if ($scope.rawData) {
                updateData($scope.rawData, dataIndex);
            }
        });
    }
})();
