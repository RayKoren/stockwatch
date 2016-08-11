var stockWatch = angular.module('stockWatch', []).config(function($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
var stockPrice;
var stockName;
var stockSymbol;
var chart;

function mainController($scope, $http) {
    $scope.formData = {};

    $scope.getQuote = function() {
        $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + $scope.formData.text + "%22)&format=json&env=store://datatables.org/alltableswithkeys")
            .success(function(data) {
                console.log(data);
                var stockPrice = data.query.results.quote.Ask;
                var stockName = data.query.results.quote.Name;
                var stockSymbol = data.query.results.quote.Symbol;
                var stockOpen = data.query.results.quote.Open;
								var DaysHigh = data.query.results.quote.DaysHigh;
								var DaysLow = data.query.results.quote.DaysLow;
                $scope.stockName = stockName;
                $scope.stockPrice = stockPrice;
                $scope.stockSymbol = stockSymbol;
								var d = new Date();
                var chart = c3.generate({
                    bindto: '#chart',
                    data: {
											x: 'x',
                        columns: [
                            ['Today', stockOpen, stockPrice],
														['High/Low', DaysLow, DaysHigh],
														['x', d.setHours(9,0,0,0), Date.now()]
                        ]
                    },
                    axis: {
											x: {
												type: 'timeseries',
												            localtime: true,
												            tick: {
												                format: '%Y-%m-%d %H:%M:%S'}},
                        y: {
                            label: 'Price'
                        }
                    }

                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
