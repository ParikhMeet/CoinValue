const https = require('https');
const symbols = ['XVG', 'XLM', 'FUEL', 'ADA', 'AMB', 'MIOTA', 'ENG', 'KMD', 'WAVES', 'NAV', 'LSK', 'NEBL', 'NEO', 'CTR', 'XMR', 'ZEC', 'QSP', 'TRX', 'ETH', 'DASH', 'GNT', 'RDD', 'BCH', 'LTC', 'XRP', 'BTC', 'BTG'];

function getCoinData() {
    var url = 'https://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=200';

    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var jsonBody = JSON.parse(body);
            console.log("Got a response: ", jsonBody);
            var jsonData = mapResponse(jsonBody);
            console.log("Data: ", jsonData);
            symbols.forEach(symbol => console.log(jsonData[symbol]));
        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
    });
}

function mapResponse(jsonBody) {
    var coinMap = {};
    jsonBody.forEach(element => {
        if (coinMap[element.symbol] != null || coinMap[element.symbol] != undefined) {
            console.error("Duplicate value found for ", element.symbol);
            process.exit();
        }
        coinMap[element.symbol] = element.price_gbp;
    });
    return coinMap;
}

getCoinData();