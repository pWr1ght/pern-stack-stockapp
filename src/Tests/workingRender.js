import React, {Fragment, useState, useEffect, useContext} from 'react';
import axios from 'axios'
import StockCharts from './stockRow'
import ChartCompon from './newInfo';
import {ModifyDataForChart} from '../scripts/sortChartData'
import GetStocks from '../api/getStocks'
import { StocksContext } from '../context/stockContext';
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = '' // Replace this




const SearchResults = (props) => {
    const {stocks, setStocks} = useContext(StocksContext)

    const [stock, setStockInput] = useState([]);
    const [ticker, setTicker] = useState("");
    const [stockData, setstockData] = useState([]);
    const [item,setItem] = useState([])
    useEffect( () => {
        const fetchData = async () => {
            try{
                let allTick = []
                const response = await GetStocks.get('/')
                // console.log(response.data[0].ticker)
                let tickers = response.data
                let tick = []
                tickers.forEach(element => {
                    tick.push(element.ticker)
                })
                console.log("this tick",tick)
                tick.forEach( posting => {
                    const finnhubClient = new finnhub.DefaultApi()
                    // DATE NOW is the unix date
                    let now = new Date().getTime()
                    let current = parseInt(now/1000)
                    let month = current - (86400 * 31)

                    finnhubClient.stockCandles(posting, "D", month, current, {}, (error, data, response) => {
                        if(response.body.error == "Symbol not supported.") {
                            console.log("don't add to list");
                        }
                        else{
                            data.symbol = posting
                            let sanitizedData = ModifyDataForChart(data)
                            allTick.push(sanitizedData)
                            // setStockInput([...stock, posting])
                            // setstockData(data)
                            // display(data)
                        }
                        let NewItem = []
                        console.log(allTick)
                        // console.log([...item, allTick])
                        setItem([...item,...allTick])
                    });
                })
                // let ticker = response.data[0].ticker
                // setStocks(ticker)
                // const finnhubClient = new finnhub.DefaultApi()
                // // DATE NOW is the unix date
                // let now = new Date().getTime()
                // let current = parseInt(now/1000)
                // let month = current - (86400 * 31)

                // finnhubClient.stockCandles(ticker, "D", month, current, {}, (error, data, response) => {
                //     if(response.body.error == "Symbol not supported.") {
                //         console.log("don't add to list");
                //     }
                //     else{
                //         data.symbol = ticker
                //         setStockInput([...stock, ticker])
                //         setstockData(data)
                //         display(data)
                //     }
                // }); 
            } catch(err) {
                console.log(err);
            }
        }
        fetchData()
        
    }, [item]);

    const display = (tickerData) => {
        console.log("display", item.length)
        let pracData = ModifyDataForChart(tickerData)
        let pass = 1
        item.forEach(element => {
          if(element.options.title.text == tickerData.symbol) {
          pass = 0
          }
        })

        if (pass) {
          setItem([...item,pracData])
        }
        else {
          console.log("no load")
        }
    }
    // state has to be rendered before change can occur

    const onSubmitForm = async e => {
        e.preventDefault();
        const finnhubClient = new finnhub.DefaultApi()
        // DATE NOW is the unix date
        let now = new Date().getTime()
        let current = parseInt(now/1000)
        let month = current - (86400 * 31)
        if (!stock.includes(ticker.trim())) {
            finnhubClient.stockCandles(ticker, "D", month, current, {}, (error, data, response) => {
                if(response.body.error == "Symbol not supported.") {
                    console.log("don't add to list");
                }
                else{
                    
                    data.symbol = ticker
                    setStockInput([...stock, ticker])
                    setstockData(data)
                    display(data)
                }
            });
        } else {
            console.log("not in stock")
        }

    }

    const showState = () =>
    {
        console.log("this is item list, ", item)
        console.log("this is stock, ", stock)
        console.log("this is stockData, ", stockData)
        console.log("this is the latest ticker entered, ", ticker)
    }

    // useEffect(() => {
    //     console.log("d", item.length)
    // }, [item])

    return (
    <Fragment>
        <div>
            <h1 className="text-center mt-5">Enter your Stock</h1>
                <form onSubmit={onSubmitForm}>
                    <input text="text" className="form-control" value={ticker} onChange={e => setTicker(e.target.value)}/>
                    <button type="submit">Add</button>
                </form>
            </div>
            <div className="container">
            <div className="row">
            {
              item && item.map(now => (
              <div className="col-sm">
                <ChartCompon data={now}></ChartCompon>
              </div>
              ))
            }
            {/* <StockCharts tickerData={stockData}/> */}
            </div>
          </div>
          <div>
              {/* {
                  JSON.stringify(stocks)
              } */}
          </div>
        <button onClick={() => showState()}>ShowState</button>
    </Fragment>
    )
}

export default SearchResults;
