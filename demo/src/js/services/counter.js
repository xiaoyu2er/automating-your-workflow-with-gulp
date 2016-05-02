angular.module('app')
    .factory('Counter', function () {
        var counter = 0;
        return {
            'get': function () {
                return counter;
            },
            add: function (num) {
                return counter += num;

            },
            'delete': function (num) {
                return counter -= num;
            }
        }
    });