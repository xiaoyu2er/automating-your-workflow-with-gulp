angular.module('app')
    .filter('upper', function () {
        return function (str) {
            if (angular.isString(str)) {
                return str.toUpperCase();
            } else {
                return str;
            }
        }
    });