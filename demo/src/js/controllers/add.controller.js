angular.module('app')
    .controller('addCtrl', function ($scope, Counter) {
        $scope.vm = {
            title: 'Add Controller',
            counter: Counter.get()
        };

        $scope.add = function () {
            Counter.add(1);
        };

        $scope.$watch(Counter.get, function (newValue) {
            $scope.vm.counter = newValue;
        })

    });
