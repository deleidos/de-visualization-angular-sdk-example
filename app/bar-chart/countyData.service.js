(function () {
    "use strict";

    angular.module('sdk-example.barChart')
        .factory('sdk-example.barChart.countyDataService', countyDataService);

    countyDataService.$inject = ['$q', '$http'];
    function countyDataService($q, $http) {
        return {
            getEducationData: getEducationData
        };

        function getEducationData() {
            var deferred = $q.defer();

            $http.get('https://data.maryland.gov/api/views/63pe-mygy/rows.json')
                .then(function (successData) {
                    deferred.resolve(successData);
                }, function (faultData) {
                    deferred.reject(faultData);
                });

            return deferred.promise;
        }
    }
})();
