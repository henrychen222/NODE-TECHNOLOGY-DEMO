angular.module('example2', ['rx'])
    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://en.wikipedia.org/w/api.php'
        ])
    })
    .controller('AppCtrl2', function ($scope, $http, rx) {
        
        //service
        function searchWikipedia(term) {
            console.log("test111111111111111")
            return rx.Observable
                .fromPromise($http({
                    url: "http://en.wikipedia.org/w/api.php",
                    method: "jsonp",
                    params: {
                        action: "opensearch",
                        search: term,
                        format: "json"
                    }
                }))
                .map(function (response) {
                    console.log("test22222222222222222222")
                    return response.data[1];
                });
        }

        $scope.search = '';
        $scope.results = [];

        /*
          Creates a "click" function which is an observable sequence instead of just a function.
        */
        $scope.$createObservableFunction('click')
            .map(function () { return $scope.search; })
            .flatMapLatest(searchWikipedia)
            .subscribe(function (results) {
                $scope.results = results;
                console.log(results)
            });
    });