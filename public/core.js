var stockWatch = angular.module('stockWatch', []);
var stockPrice;
var stockName;

function mainController($scope, $http) {
    $scope.formData = {};

    $scope.getQuote = function() {
        $.ajax({
            type: "GET",
            url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + $scope.formData.text +"%22)&format=json&env=store://datatables.org/alltableswithkeys",
            success: function(data) {
							console.log(data);
							var stockPrice = data.query.results.quote.Ask;
							var stockName = data.query.results.quote.Name;
							$scope.stockName = stockName;
							$scope.stockPrice = stockPrice;

            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            },
        });
    };
}
