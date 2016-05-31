(function () {
    "use strict";

    angular.module('sdk-example.common')
        .filter('countyData', countyDataFilter);

    countyDataFilter.$inject = ['numberFilter', 'currencyFilter'];
    function countyDataFilter(numberFilter, currencyFilter) {
        return function(input, dataType) {
            // if input is null, display 'None' for the value
            if (!input) {
                return 'None';
            }

            // display the value differently depending on what type of data it is
            var output;
            switch (dataType) {
                case 'money':
                    output = currencyFilter(input);
                    break;
                case 'percent':
                    console.log('number');
                    output = input + '%';
                    break;
                default:
                case 'number':
                    output = numberFilter(input);
            }

            return output;
        };
    }
})();
