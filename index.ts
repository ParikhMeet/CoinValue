const symbols: Array<string> = ['XVG', 'XLM', 'FUEL', 'ADA', 'AMB', 'MIOTA', 'ENG', 'KMD', 'WAVES', 'NAV', 'LSK', 'NEBL', 'NEO', 'CTR', 'XMR', 'ZEC', 'QSP', 'TRX', 'ETH', 'DASH', 'GNT', 'RDD', 'BCH', 'LTC', 'XRP', 'BTC', 'BTG']
import * as https from 'https'
import { IncomingMessage } from 'http'

interface Coins {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    price_gbp: number
}

function getCoinData() {
    var url = 'https://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=200'

    https.get(url, function (res: IncomingMessage) {
        var body = ''

        res.on('data', function (chunk: string) {
            body += chunk
        })

        res.on('end', function () {
            var jsonBody: Array<Coins> = JSON.parse(body)
            console.log("Got a response: ", jsonBody)
            var jsonData: Map<string, number> = mapResponse(jsonBody)
            console.log("Data: ", jsonData)
            symbols.forEach(symbol => console.log(jsonData.get(symbol)))
        })
    }).on('error', function (e) {
        console.log("Got an error: ", e)
    })
}

function mapResponse(jsonBody: Array<Coins>) {
    var coinMap = new Map<string, number>()
    jsonBody.forEach(element => {
        if (coinMap.has(element.symbol)) {
            console.error("Duplicate value found for ", element.symbol)
            process.exit()
        }
        coinMap.set(element.symbol, element.price_gbp)
    })
    return coinMap
}

getCoinData()