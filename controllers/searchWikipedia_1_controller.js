angular.module('example', ['rx'])
    .controller('AppCtrl', function ($scope, observeOnScope) {

        // Listen for changes on the name
        observeOnScope($scope, 'name').subscribe(function (change) {
            $scope.observedChange = change;
            $scope.newValue = change.newValue;
            $scope.oldValue = change.oldValue;
        });
    });