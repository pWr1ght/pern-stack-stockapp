import React, {Fragment, useState, useEffect, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import { StocksContext } from '../context/stockContext';
import BigStockChart from './bigStockChart';
import InteractiveChart from './interactiveChart'
import axios from 'axios';
import GetStocks from '../api/getStocks'

const ViewStock = (props) => {
    const history = useHistory()
    const {stocks, setStocks} = useContext(StocksContext)
    const [stockFinanceData, setStockFinanceData] = useState([]);

    //passing params from route
    const {id, name} = useParams();

    const onHandleBack = () => {
        history.goBack();
    }

    useEffect( () => {
        console.log("you've entered view page")
        
        const fetchChartData = async (id, name) => {
            try {
                let response = await GetStocks.get(`/singlestock/${name}/${id}`)
                console.log(response);
                setStockFinanceData(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchChartData(id, name)
    }, [])
    
    return (
        <div>
            <button onClick={() => {console.log("changes to new route")}}>View chart</button>
            <BigStockChart stockFinanceData={stockFinanceData}/>
            <div>{id}</div>
            <InteractiveChart/>
            <button onClick={onHandleBack}>go back</button>
            <h1>hello</h1>
        </div>
    )
}

export default ViewStock
