(function () {
    "use strict";

    angular.module('sdk-example.home')
        .controller('sdk-example.home.HomeController', HomeController);

    HomeController.$inject = ['$scope', 'sdk-example.common.commonService'];
    function HomeController($scope, commonService) {
        $scope.titleText = commonService.getHomeText();
    }
})();
