describe('HomeController', function () {
    var testScope;

    beforeEach(function () {
        module('sdk-example.home');
        inject(function ($controller, $rootScope) {
            testScope = $rootScope.$new();
            $controller('sdk-example.home.HomeController', {
                $scope: testScope
            });
        });
    });

    it('should successfully initiate data', function () {
        expect(testScope.titleText).toBe('Welcome!');
    });
});
