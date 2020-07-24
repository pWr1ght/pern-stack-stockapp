const router = require('express').Router();
const pool = require('../db.js');
const { route } = require('express/lib/router');
const axios = require('axios');
const fillInBlank = require('../../src/scripts/new').default;
const { lookup, history } = require('yahoo-stocks');
// const e = require('express');
// const FinnhubAPI = require('@stoqey/finnhub');
var parser = require('xml2json');
const finnhub = require('finnhub');
const dataOrganize = require('../../src/scripts/yFinFormat')
const getYahooData = require('stock-info');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.APIKEY_FINHUB// Replace this


// const ModifyDataForChart = require('../../src/scripts/sortChartData');

router.route("/singlestock/:id/:name").get( async (req, res) => {
    let {id,name} = req.params
    // res.json([]);
    // uncomment when to use update on view
    try {
        const yFinanceCandleResponse = await history(`${name}`, {interval: '1d', range: '1y'})
        // console.log(yFinanceCandleResponse.data)
        const yFinanceCandleRecords = yFinanceCandleResponse.records.map(record => {
            const {
                time, open, high, low, close, volume
            } = record
            return [time * 1000, open, high, low, close, volume]
        })
        
        res.json(yFinanceCandleRecords)
        // let arrayOfCandleData = []
        // yFinanceCandleResponse.records.forEach((candlestickObject) => {
        //     let candleData = []
        //     candleData.push((candlestickObject.time * 1000))
        //     candleData.push((candlestickObject.open))
        //     candleData.push((candlestickObject.high))
        //     candleData.push((candlestickObject.low))
        //     candleData.push((candlestickObject.close))
        //     candleData.push((candlestickObject.volume))
        //     arrayOfCandleData.push(candleData)
        // })
        // res.json(arrayOfCandleData)
    } catch(err) {
        console.log(err)
    }
})


router.route("/singlestock/news").get( async (req, res) => {
    let {stockName} = req.query;
    try{
        // back up google news xml fetch api
        const newsResponse = await axios.get("https://news.google.com/rss/search?q=stock+google&hl=en-US&gl=US&ceid=US:en")
        var json = parser.toJson(newsResponse.data);
        let jsonObject = JSON.parse(json);
        console.log(jsonObject.rss.channel.item)
        res.json(jsonObject.rss.channel.item)

        // const newsResponseFin = await axios.get(`https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-04-30&to=2020-05-01&token=${process.env.APIKEY_FINHUB}`)
        // console.log(newsResponseFin.data)
        // res.json(newsResponseFin.data)
    }
    catch(err) {
        console.log("did not get the news")
    }
})

router.route("/singlestock/reccomendation").get( async (req, res) => {
    let {stockName} = req.query;
    try{
        const recommendationResponseFin = await axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=AAPL&token=${process.env.APIKEY_FINHUB}`)
        
        // console.log(recommendationResponseFin.data)
        res.json(recommendationResponseFin.data)
    }
    catch(err) {
        console.log("did not get the news")
    }
})

router.route("/").get( async (req, res) => {
    try {
        let {to, from} = req.query
        // console.log("showing to", to)
        // console.log("showing from", from)


        const getAllStocksResponse = await pool.query('SELECT * FROM stock')
        const tickers = getAllStocksResponse.rows 
        //|| []
        // console.log(tickers)
        const newSymbols = []
        const stockId = []
        // if(tickers.length > 0) {
            //pushing the data into a list
            tickers.forEach(element => {
                newSymbols.push(element.ticker)
                stockId.push(element.stock_id)
            })
        // }
        // console.log(newSymbols)
        // console.log(tickers)
        let listOfTickerData =[]
        for(let i = 0; i < tickers.length; i++) {
            // yahoo Api
            // let yFinanceCandleResponse = await history(`${tickers[i].ticker}`, {interval: '1d', range: '1y'})
            // // console.log(yFinanceCandleResponse)
            // yFinanceCandleResponse = dataOrganize.yFinToApChart(yFinanceCandleResponse)
            // yFinanceCandleResponse.symbol = tickers[i].ticker
            // yFinanceCandleResponse.stockId = stockId[i]
            // // let yFinanceCurrent = await lookup(tickers[i].ticker);
            // // yFinanceCandleResponse.current = yFinanceCurrent
            // let finHubMarketPofrileResponse = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${tickers[i].ticker}&token=${process.env.APIKEY_FINHUB}`)
            // console.log(finHubMarketPofrileResponse.data)
            // listOfTickerData.push(yFinanceCandleResponse)
            // console.log(listOfTickerData)
            
            // promise example
            // if(yFinanceCandleData.s === "no_data")
            // {
            //     await new Promise((resolve) => {
            //         setTimeout(() => {
            //             resolve()
            //         }, 1000)
            //     })
            //     yFinanceCandleResponse = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${tickers[i].ticker}&resolution=D&from=${from}&to=${to}&token=${process.env.APIKEY_FINHUB}`)
            // }

            //finhub Api

            let yFinanceCandleResponse = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${tickers[i].ticker}&resolution=D&from=${from}&to=${to}&token=${process.env.APIKEY_FINHUB}`)
            const yFinanceCandleData = yFinanceCandleResponse.data
            const finCurrentPriceData = await getYahooData.getSingleStockInfo(tickers[i].ticker)
            // let finCurrentPriceResponse = await axios.get(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.APIKEY_FINHUB}`)
            // const finCurrentPriceData = [finCurrentPriceResponse.data]
            // console.log(yFinanceCandleResponse)
            yFinanceCandleData.dataSummary = finCurrentPriceData
            if(!yFinanceCandleData.dataSummary.trailingPE) {
                yFinanceCandleData.dataSummary.trailingPE = "N/A";
            }
            // get first word for logo
            console.log(finCurrentPriceData)
            let name = finCurrentPriceData.displayName.split(" ")[0]
            
            const pictureData = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`)
            console.log(pictureData.data)
            yFinanceCandleData.imageInfo = pictureData.data[0]
            yFinanceCandleData.symbol = tickers[i].ticker
            yFinanceCandleData.stockId = stockId[i]
            listOfTickerData.push(yFinanceCandleData)
            
            // console.log(listOfTickerData)
        }
        // lookup('AAPL').then(response => {
        //     console.log(response);
        // });
        // listOfTickerData = [listOfTickerData]
        // listOfTickerData.push(newSymbols)
        // console.log(listOfTickerData)
        res.json([listOfTickerData, newSymbols])
    } catch(err) {
         console.log(finCurrentPriceData)
        console.log("Error: ",err);
    }
});

// router.route("/").get( async (req, res) => {
//     try {
//         const getAllStocks = await pool.query('SELECT * FROM stock');
//         res.json(getAllStocks.rows);
//     } catch(err) {
//         console.log(err.message);
//     }
// });

// need to update add
router.route("/").post( async (req, res) => {
    let {ticker, user_id, from, to} = req.body;
    try {
        const candleStockChartResponse = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${from}&to=${to}&token=${process.env.APIKEY_FINHUB}`)
        if(!candleStockChartResponse.data.error) {
        console.log("no error--------")
        // console.log("candleStock error", candleStockChartResponse.data)
        const postStock =  await pool.query('INSERT INTO stock (user_id, ticker) VALUES (2, $1) RETURNING *',[ticker]);
        const finCurrentPriceData = await getYahooData.getSingleStockInfo(ticker)
        let stockId = postStock.rows[0].stock_id
        let name = finCurrentPriceData.displayName.split(" ")[0]
        const pictureData = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`)
        console.log(pictureData.data)
        candleStockChartResponse.data.symbol=ticker
        candleStockChartResponse.data.stockId = stockId
        candleStockChartResponse.data.dataSummary = finCurrentPriceData
        candleStockChartResponse.data.imageInfo = pictureData.data[0]

        
        // const modifiedData = ModifyDataForChart.test(hello.data)
        // console.log(modifiedData.data)
        // res.json(modifiedData)
        // console.log(candleStockChartResponse.data)
        res.json(candleStockChartResponse.data)
        } else {
            console.log("error--------")
            res.json([])
        }
    } catch (err){
        console.log(err);
    }
})

router.route("/:id").delete(async (req, res) => {
    const id = req.params.id
    try {
        const deleteStock = await pool.query('DELETE FROM stock WHERE stock_id = $1', [id]);
        res.json(deleteStock);
    } catch {
        console.log(error)
    }
})

module.exports = router;

 

