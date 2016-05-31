(function () {
    "use strict";

    angular.module('sdk-example.home')
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'home/home.html',
                controller: 'sdk-example.home.HomeController'
            });
    }
})();
