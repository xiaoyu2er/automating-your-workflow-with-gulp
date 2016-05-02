angular.module('app')
    .controller('deleteCtrl', function ($scope, Counter) {
        $scope.vm = {
            title: 'Delete Controller',
            counter: Counter.get()
        };

        $scope.delete = function () {
            Counter.delete(1);
        };

        $scope.$watch(Counter.get, function (newValue) {
            $scope.vm.counter = newValue;
        })

    });
