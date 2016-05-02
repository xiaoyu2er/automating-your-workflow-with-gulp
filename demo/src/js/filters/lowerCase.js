angular.module('app')
    .filter('lower', function () {
        return function (str) {
            if (angular.isString(str)) {
                return str.toLowerCase();
            } else {
                return str;
            }
        }
    });