angular.module('app')
    .directive('demoDelete', function () {
        return {
            restrict: 'AE',
            templateUrl: 'delete.tpl.html',
            controller: 'deleteCtrl'
        }
    });
