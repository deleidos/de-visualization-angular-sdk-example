(function () {
    "use strict";

    angular.module('sdk-example', [
            /* add any defined modules here */
            'ngRoute',
            'sdk-example.home',
            'sdk-example.common',
            'sdk-example.barChart'
        ])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/home'});
        }])
        .controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
            $scope.$location = $location;

        }]);
})();
