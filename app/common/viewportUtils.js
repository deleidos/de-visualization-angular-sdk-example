(function () {
    "use strict";

    angular.module('sdk-example.common')
        .factory('viewportUtils', viewportUtils);

    viewportUtils.$inject = ['$window'];
    function viewportUtils($window) {
        return {
            watchWindowSize: watchWindowSize
        };

        function onWindowResize(listener) {
            var winEl = angular.element($window);
            winEl.bind('resize', listener);
            return function () {
                winEl.unbind('resize', listener);
            };
        }

        function watchWindowSize(scope, listener) {
            var unRegisterFn = onWindowResize(listener);
            scope.$on('$destroy', unRegisterFn);
        }
    }
})();
