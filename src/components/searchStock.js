import React, {Fragment, useState, useEffect, useContext, useCallback} from 'react';
import axios from 'axios'
import CandleChart from './newInfo';
import GetStocks from '../api/getStocks'
import { StocksContext } from '../context/stockContext';
import {CircularProgress} from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import {rearangeData} from '../scripts/sortChartData';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import '../styles/style.css'

// const finnhub = require('finnhub');
// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = 





const SearchResults = (props) => {
    const {stocks, setStocks} = useContext(StocksContext)

    // const [stock, setStockInput] = useState([]);
    const [tickerName, setTickerName] = useState("");
    const [stockList, setStockList] = useState([]);
    const [loading, setLoading] = useState(false);

    // const fetchData = useCallback(async () => {
    //     console.log("hello")
    //     try{
    //         //initiate the date for to and from for api call
    //         let now = new Date().getTime()
    //         let current = parseInt(now/1000)
    //         let month = current - (86400 * 31)

    //         const stockResponse = await GetStocks.get('/', {
    //             params:{ from: month, to: current}
    //         })
    //         const candleChartData = stockResponse.data[0];
    //         let totalCandleData = []
    //         candleChartData.forEach(element => {
    //             let oneCandle = rearangeData(element);
    //             totalCandleData.push(oneCandle);
    //         })
    //         setLoading(true)
    //         setStockList(stockResponse.data[1])
    //         setStocks(totalCandleData)
    //     } catch(err) {
    //         // console.log("thi is an error, ", err);
    //     }
    // });

    useEffect( () => {
        const fetchData = async () => {
            // console.log("hello")
            try{
                //initiate the date for to and from for api call
                const now = new Date().getTime()
                const current = parseInt(now/1000)
                const month = current - (86400 * 31)
    
                const stockResponse = await GetStocks.get('/', {
                    params:{ from: month, to: current}
                })
                const candleChartData = stockResponse.data[0];
                const totalCandleData = candleChartData
                    .map(element => rearangeData(element))
                // let totalCandleData = []
                // candleChartData.forEach(element => {
                //     let oneCandle = rearangeData(element);
                //     totalCandleData.push(oneCandle);
                // })
                setLoading(true)
                setStockList(stockResponse.data[1])
                setStocks(totalCandleData)
            } catch(err) {
                // console.log("thi is an error, ", err);
            }
        };
        fetchData()
            // return () => {
                
            // }
    }, [setStocks]);

    // const display = (tickerData) => {
    //     console.log("display", item.length)
    //     let pracData = ModifyDataForChart(tickerData)
    //     let pass = 1
    //     item.forEach(element => {
    //       if(element.options.title.text == tickerData.symbol) {
    //       pass = 0
    //       }
    //     })

    //     if (pass) {
    //       setItem([...item,pracData])
    //     }
    //     else {
    //       console.log("no load")
    //     }
    // }
    // state has to be rendered before change can occur

    const onSubmitForm = async e => {
        e.preventDefault();

        //initiate the date for to and from for api call
        let now = new Date().getTime()
        let current = parseInt(now/1000)
        let month = current - (86400 * 31)
        // const finnhubClient = new finnhub.DefaultApi()
        // DATE NOW is the unix date
        if (!stockList.includes(tickerName.trim())) {
            const response = await GetStocks.post('/', {
                user_id: '2',
                ticker: tickerName,
                from: month,
                to: current
              })
            // console.log(response)
            response.data = rearangeData(response.data)
                setStocks([...stocks, response.data])
        } else {
            console.log("not in stock")
        }

    }

    const showState = () =>
    {
        // console.log("this is item list, ", item)
        console.log("this is stockList, ", stockList)
        console.log("this is the latest ticker entered, ", tickerName)
    }

    return (
    <Fragment>

        <div>
            <Container maxWidth="sm" className="text-center">
                {/* header */}
                <h1>Welcome to your stock portfolio</h1>
                    {/* input */}
                    <form onSubmit={onSubmitForm} noValidate autoComplete="off">
                        <div className="searchHeader">
                            <TextField id="standard-basic" label="Please Enter your stock ticker" text="text" className="form-control" value={tickerName} onChange={e => setTickerName(e.target.value)}/>
                            <ButtonGroup
                                color="primary"
                                aria-label="contained primary button group"
                                variant="contained"
                            >
                            <Button color="primary" type="submit">Add</Button>
                            </ButtonGroup>
                        </div>
                    </form>
            </Container>


            <div className="container">
                <div className="row">
                    {
                    loading ? (stocks && stocks.map(now => (
                        <div key={now.options.title.text} className="col-sm">
                            <CandleChart stockList={stockList} setStockList={setStockList} data={now} id={now.stockId} name={now.options.title.text}></CandleChart>
                        </div>
                        ))) : (<CircularProgress />)
                    }
                </div>
            </div>
        </div>
        <button onClick={() => showState()}>ShowState</button>
    </Fragment>
    )
}

export default SearchResults;