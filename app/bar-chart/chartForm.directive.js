(function () {
    "use strict";

    angular.module('sdk-example.barChart')
        .directive('chartForm', chartFormDirective);

    function chartFormDirective() {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope', function ($scope) {
                $scope.sortMethod = 'county';

                $scope.sort = function (data, sortMethod) {
                    var _data = _.sortBy(data, function (d) {
                        if (sortMethod === 'value') {
                            return d.datum;
                        } else if ($scope.sortMethod === 'county') {
                            return d.county;
                        }
                    });

                    // if sort by value, reverse the data to put it in descending order
                    if (sortMethod === 'value') {
                        _data = _data.reverse();
                    }

                    return _data;
                };

                // sort the data when the sort method changes
                $scope.$watch('sortMethod', function (sortMethod) {
                    $scope.data = $scope.sort($scope.data, sortMethod);
                });
            }],
            template: [
                '<div class="form-inline">',
                    '<div><strong>Sort by</strong></div>',
                    '<div class="radio">',
                        '<label>',
                            '<input type="radio" ng-model="sortMethod" value="value">&nbsp;Value&nbsp;',
                        '</label>',
                    '</div>',
                    '<div class="radio">',
                        '<label>',
                            '<input type="radio" ng-model="sortMethod" value="county">&nbsp;County&nbsp;',
                        '</label>',
                    '</div>',
                    '<hr>Hovered bar data: <strong>{{ (barValue | countyData:dataType) }}</strong>',
                '</div>'
            ].join('')
        };
    }
})();
