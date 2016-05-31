(function () {
    "use strict";

    angular.module('sdk-example.common')
        .factory('sdk-example.common.commonService', commonService);

    commonService.$inject = [];
    function commonService() {
        return {
            getHomeText: getHomeText
        };

        function getHomeText() {
            return 'Welcome!';
        }
    }
})();
