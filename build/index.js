"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const symbols = ['XVG', 'XLM', 'FUEL', 'ADA', 'AMB', 'MIOTA', 'ENG', 'KMD', 'WAVES', 'NAV', 'LSK', 'NEBL', 'NEO', 'CTR', 'XMR', 'ZEC', 'QSP', 'TRX', 'ETH', 'DASH', 'GNT', 'RDD', 'BCH', 'LTC', 'XRP', 'BTC', 'BTG'];
const https = __importStar(require("https"));
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
            symbols.forEach(symbol => console.log(jsonData.get(symbol)));
        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
    });
}
function mapResponse(jsonBody) {
    var coinMap = new Map();
    jsonBody.forEach(element => {
        if (coinMap.has(element.symbol)) {
            console.error("Duplicate value found for ", element.symbol);
            process.exit();
        }
        coinMap.set(element.symbol, element.price_gbp);
    });
    return coinMap;
}
getCoinData();
