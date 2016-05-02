angular.module('app')
    .directive('demoAdd', function () {
        return {
            restrict: 'AE',
            templateUrl: 'add.tpl.html',
            controller: 'addCtrl'
        }
    });