const router = require('express').Router();
const pool = require('../db.js');
const { route } = require('express/lib/router');
const axios = require('axios');
const fillInBlank = require('../../src/scripts/new').default;
const { lookup, history } = require('yahoo-stocks');
// const e = require('express');
// const FinnhubAPI = require('@stoqey/finnhub');
const finnhub = require('finnhub');
const dataOrganize = require('../../src/scripts/yFinFormat')
const si = require('stock-info');
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
            const finCurrentPriceData = await si.getSingleStockInfo(tickers[i].ticker)
            // let finCurrentPriceResponse = await axios.get(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.APIKEY_FINHUB}`)
            // const finCurrentPriceData = [finCurrentPriceResponse.data]
            // console.log(yFinanceCandleResponse)
            yFinanceCandleData.dataSummary = finCurrentPriceData
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

router.route("/").post( async (req, res) => {
    let {ticker, user_id, from, to} = req.body;
    try {
        const candleStockChartResponse = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${from}&to=${to}&token=${process.env.APIKEY_FINHUB}`)
        if(!candleStockChartResponse.data.error) {
        console.log("no error--------")
        // console.log("candleStock error", candleStockChartResponse.data)
        const postStock =  await pool.query('INSERT INTO stock (user_id, ticker) VALUES (2, $1) RETURNING *',[ticker]);
        let stockId = postStock.rows[0].stock_id
        candleStockChartResponse.data.symbol=ticker
        candleStockChartResponse.data.stockId = stockId
        // const modifiedData = ModifyDataForChart.test(hello.data)
        // console.log(modifiedData.data)
        // res.json(modifiedData)
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
// router.route("/:id").put(async (req, res) => {
//     try {
//         const postStock = await pool.query('')
//     } catch {

//     }
// })

let newfunction = () =>
{
    let item =
    { c:
        [ 12.98,
          12.59,
          12.17,
          10.42,
          11.53,
          11.41,
          11.55,
          11.55,
          11.65,
          11.48,
          11.83,
          12.2,
          11.14,
          11.83,
          10.93,
          10.99,
          11.24,
          10.95,
          10.97,
          11.47,
          11.23,
          11.005 ],
       h:
        [ 13.04,
          12.69,
          12.61,
          11.44,
          11.62,
          11.53,
          12.14,
          11.81,
          11.935,
          12,
          11.91,
          12.31,
          12.04,
          11.84,
          11.7,
          11.19,
          11.36,
          11.66,
          11.68,
          11.575,
          11.64,
          12.12 ],
       l:
        [ 12.3,
          12.07,
          11.93,
          10.27,
          11.045,
          10.68,
          11.38,
          11.38,
          11.13,
          11.34,
          11.33,
          11.93,
          10.9,
          10.86,
          10.87,
          10.7,
          10.745,
          10.9,
          10.86,
          11.02,
          11.11,
          10.89 ],
       o:
        [ 12.7,
          12.38,
          12.51,
          10.89,
          11.2,
          10.9,
          12.02,
          11.55,
          11.26,
          11.98,
          11.42,
          12.12,
          11.96,
          11.01,
          11.61,
          11.04,
          10.84,
          11.18,
          11.26,
          11.35,
          11.23,
          12.07 ],
       s: 'ok',
       t:
        [ 1591623000,
          1591709400,
          1591795800,
          1591882200,
          1591968600,
          1592227800,
          1592314200,
          1592400600,
          1592487000,
          1592573400,
          1592832600,
          1592919000,
          1593005400,
          1593091800,
          1593178200,
          1593437400,
          1593523800,
          1593610200,
          1593696600,
          1594042200,
          1594128600,
          1594215000 ],
       v:
        [ 11247200,
          7781500,
          8252100,
          11959400,
          10179200,
          6956200,
          9383200,
          6522800,
          6059700,
          8894300,
          7827400,
          7237300,
          7562700,
          6728600,
          25817600,
          7397600,
          5798100,
          7706500,
          7515400,
          7084300,
          4610100,
          9160602 ]
        }
    return item;
}
 module.exports = router;

 

