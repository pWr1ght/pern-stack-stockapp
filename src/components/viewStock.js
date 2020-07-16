import React, {Fragment, useState, useEffect, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import { StocksContext } from '../context/stockContext';
import BigStockChart from './bigStockChart';
import InteractiveChart from './interactiveChart'
import axios from 'axios';
import GetStocks from '../api/getStocks'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'; 

const ViewStock = (props) => {
    const history = useHistory()
    // const {stocks, setStocks} = useContext(StocksContext)
    const [stockFinanceData, setStockFinanceData] = useState([]);

    //passing params from route
    const {id, name} = useParams();

    const onHandleBack = () => {
        console.log("hello")
        history.goBack();
    }

    useEffect( () => {
        console.log("you've entered view page")
        
        const fetchChartData = async (id, name) => {
            try {
                let response = await GetStocks.get(`/singlestock/${id}/${name}`)
                console.log(response);
                setStockFinanceData(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchChartData(id, name)
    }, [])
    
    const getNextLink = () => {
        console.log("hello")
        history.push({
            pathname: `/view/interactive/${id}/${name}`,
            state: {stockData: stockFinanceData}
          })
        // history.push(`/view/interactive/${id}/${name}`)
    }
    return (
        <div>
            <button onClick={getNextLink}>Link</button>
            {/* <button><Link to="/view/interactive/3/gekk/">Link</Link></button> */}
            <BigStockChart symbol={name} stockFinanceData={stockFinanceData}/>
            <div>{id}</div>
            <button onClick={onHandleBack}>go back</button>
            <h1>hello</h1>
        </div>
    )
}

export default ViewStock
