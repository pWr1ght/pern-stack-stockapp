const router = require('express').Router();
// const pool = require('../db.js');
const { route } = require('express/lib/router');
const axios = require('axios');
const { lookup, history } = require('yahoo-stocks');
// const e = require('express');
// const FinnhubAPI = require('@stoqey/finnhub');
global.fetch = require('node-fetch')
var parser = require('xml2json');
const finnhub = require('finnhub');
const dataOrganize = require('../../src/sortDataFunctions/yFinFormat')
const getYahooData = require('stock-info');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.APIKEY_FINHUB// Replace this
const cc = require('cryptocompare')
cc.setApiKey('e1c95fb631253a9d74c36ede3dc3727850f583b8ed2e6ef50eb604ad43c6852a')
var fincal = require("fincal");


router.route("/getCrypto").get( async (req, res) => {
    cc.priceFull(['ADA', 'BAND', 'BTC', 'BCH', 'DASH', 'EOS', 'ETC', 'ETH', 'LINK', 'LTC', 'NEO', 'ONT', 'TRX', 'USDT', 'XMR', 'XRP', 'XTZ'], ['USD'])
    .then(prices => {
            res.json(prices)
        })
        .catch(console.error)
})

router.route("/checkMarketStatus").get(async (req, res) => {
    let threeHrs = 10800000;
    let calendar = fincal.calendar("new_york");
    let currentDate = new Date().getTime();
    let marketTime = new Date(currentDate);
    let decision = calendar.areMarketsOpenAt(marketTime);
    res.json(decision);
})


router.route("/singlestock/:id/:name").get( async (req, res) => {
    let {id,name} = req.params
    // uncomment when to use update on view
    try {
        const yFinanceCandleResponse = await history(`${name}`, {interval: '1d', range: '1y'})
        const yFinanceCandleRecords = yFinanceCandleResponse.records.map(record => {
            const {
                time, open, high, low, close, volume
            } = record
            return [time * 1000, open, high, low, close, volume]
        })
        
        res.json(yFinanceCandleRecords)
    } catch(err) {
        console.log(err)
    }
})




router.route("/singlestock/news").get( async (req, res) => {
    let {stockName} = req.query;
    try{
        // back up google news xml fetch api
        const newsResponse = await axios.get(`https://news.google.com/rss/search?q=stock+${stockName}&hl=en-US&gl=US&ceid=US:en`)
        var json = parser.toJson(newsResponse.data);
        let jsonObject = JSON.parse(json);
        res.json(jsonObject.rss.channel.item)
    }
    catch(err) {
        console.log("did not get the news")
    }
})

router.route("/singlestock/reccomendation").get( async (req, res) => {
    let {stockName} = req.query;
    console.log(stockName, "----------------------")
    try{
        const recommendationResponseFin = await axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${stockName}&token=${process.env.APIKEY_FINHUB}`)
        
        res.json(recommendationResponseFin.data)
    }
    catch(err) {
        console.log("did not get the news")
    }
})

router.route("/getStockInfo").get( async (req, res) => {
    try {
        let {list, to, from} = req.query


        // const getAllStocksResponse = await pool.query('SELECT * FROM stock')
        const tickers = list
        const newSymbols = []
        const stockId = []
        tickers.forEach(element => {
            newSymbols.push(element)
            stockId.push(2)
        })
        let listOfTickerData =[]
        for(let i = 0; i < tickers.length; i++) {
            // yahoo Api Backup if FinnHub down
            let yFinanceCandleResponse = await history(`${tickers[i]}`, {interval: '1d', range: '1mo'})
            const yFinanceCandleData = dataOrganize.yFinToApChart(yFinanceCandleResponse)
            // console.log(yFinanceCandleResponsed)
            // yFinanceCandleResponse.symbol = tickers[i].ticker
            // yFinanceCandleResponse.stockId = stockId[i]
            // // let yFinanceCurrent = await lookup(tickers[i].ticker);
            // // yFinanceCandleResponse.current = yFinanceCurrent
            // let finHubMarketPofrileResponse = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${tickers[i].ticker}&token=${process.env.APIKEY_FINHUB}`)
            // console.log(finHubMarketPofrileResponse.data)
            // listOfTickerData.push(yFinanceCandleResponse)
            // console.log(listOfTickerData)

            //finhub Api primary (this API can be somewhat unreliable in terms of responding)

            // let yFinanceCandleResponse = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${tickers[i]}&resolution=D&from=${from}&to=${to}&token=${process.env.APIKEY_FINHUB}`)
            // const yFinanceCandleData = yFinanceCandleResponse.data
            let finCurrentPriceData = await getYahooData.getSingleStockInfo(tickers[i])
            yFinanceCandleData.dataSummary = finCurrentPriceData
            if(!yFinanceCandleData.dataSummary.trailingPE) {
                yFinanceCandleData.dataSummary.trailingPE = "N/A";
            }
            
            // get first word for logo
            if(finCurrentPriceData.displayName) {
                var name = finCurrentPriceData.displayName.split(" ")[0]
            }
            else{
                finCurrentPriceData = await getYahooData.getSingleStockInfo(tickers[i])
                var name = finCurrentPriceData.displayName.split(" ")[0]
            }
            
            const pictureData = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`)
            
            yFinanceCandleData.imageInfo = pictureData.data[0]
            yFinanceCandleData.symbol = tickers[i]
            yFinanceCandleData.stockId = stockId[i]
            listOfTickerData.push(yFinanceCandleData)
            
        }
        res.json([listOfTickerData, newSymbols])
    } catch(err) {
        console.log("Error: ",err);
    }
});

// yahoo API for adding
router.route("/").post( async (req, res) => {
    let {ticker, user_id, from, to} = req.body;
    // console.log(ticker)
    try {
        // Finnhub api
        // const candleStockChartResponse = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${from}&to=${to}&token=${process.env.APIKEY_FINHUB}`)
        // console.log(candleStockChartResponse.data)
        // if(candleStockChartResponse.data.s == 'ok') {
        //     console.log("no error--------")
        // ahoo Api
        let response = await history(`${ticker}`, {interval: '1d', range: '1mo'})
        console.log(response)
        const candleStockChartResponse = dataOrganize.yFinToApChart(response)
        // console.log(candleStockChartResponse)
        if(candleStockChartResponse !== null) {
        console.log("no error--------")
        // console.log("candleStock error", candleStockChartResponse.data)
        // const postStock =  await pool.query('INSERT INTO stock (user_id, ticker) VALUES (2, $1) RETURNING *',[ticker]);
        const finCurrentPriceData = await getYahooData.getSingleStockInfo(ticker)
        // let stockId = postStock.rows[0].stock_id
        let name = finCurrentPriceData.displayName.split(" ")[0]
        const pictureData = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`)
        candleStockChartResponse.symbol=ticker
        candleStockChartResponse.stockId = 2
        candleStockChartResponse.dataSummary = finCurrentPriceData
        candleStockChartResponse.imageInfo = pictureData.data[0]

        res.json(candleStockChartResponse)
        } else {
            console.log("error--------")
            res.json([])
        }
    } catch (err){
        res.json([])
        console.log(err);
    }
})


// router.route("/").post( async (req, res) => {
//     let {ticker, user_id, from, to} = req.body;
//     console.log(ticker)
//     try {
//         // Finnhub api
//         const candleStockChartResponse = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${from}&to=${to}&token=${process.env.APIKEY_FINHUB}`)
//         console.log(candleStockChartResponse.data)
//         if(candleStockChartResponse.data.s == 'ok') {
//             console.log("no error--------")
//         // console.log("candleStock error", candleStockChartResponse.data)
//         // const postStock =  await pool.query('INSERT INTO stock (user_id, ticker) VALUES (2, $1) RETURNING *',[ticker]);
//         const finCurrentPriceData = await getYahooData.getSingleStockInfo(ticker)
//         // let stockId = postStock.rows[0].stock_id
//         let name = finCurrentPriceData.displayName.split(" ")[0]
//         const pictureData = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`)
//         candleStockChartResponse.data.symbol=ticker
//         candleStockChartResponse.data.stockId = 2
//         candleStockChartResponse.data.dataSummary = finCurrentPriceData
//         candleStockChartResponse.data.imageInfo = pictureData.data[0]

//         res.json(candleStockChartResponse.data)
//         } else {
//             console.log("error--------")
//             res.json([])
//         }
//     } catch (err){
//         console.log(err);
//     }
// })

// router.route("/:id").delete(async (req, res) => {
//     const id = req.params.id
//     try {
//         const deleteStock = await pool.query('DELETE FROM stock WHERE stock_id = $1', [id]);
//         res.json(deleteStock);
//     } catch {
//         console.log(error)
//     }
// })

module.exports = router;

 

