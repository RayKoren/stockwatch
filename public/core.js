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
        $http.get("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + $scope.formData.text + "%22)&format=json&env=store://datatables.org/alltableswithkeys")
            .success(function(data) {
                console.log(data);
                var stockPrice = data.query.results.quote.Ask;
                var stockName = data.query.results.quote.Name;
								var stockSymbol = data.query.results.quote.Symbol;
								var stockOpen = data.query.results.quote.Open;
                $scope.stockName = stockName;
                $scope.stockPrice = stockPrice;
								$scope.stockSymbol = stockSymbol;
								var chart = c3.generate({
								    bindto: '#chart',
								    data: {
								      columns: [
								        ['data1', stockOpen, stockPrice],
								      ]
								    }
								});
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
