// import React, {Fragment, useState,Component, useEffect, useContext} from 'react'
// import {CurrentStockContext} from '../context/currentStockContext';
// import { useHistory } from 'react-router-dom';
// import Button from '@material-ui/core/Button';

// const ViewMoreInfo = (props) => {
//     const {currentStockInfo, setCurrentStockInfo} = useContext(CurrentStockContext)
//     let history = useHistory()
    
//     const viewStock = async (id, name, row) => {
//     let stringRow = JSON.stringify(row)
//     localStorage.setItem("currentStockInfo", stringRow);
//     setCurrentStockInfo(JSON.parse(localStorage.getItem('currentStockInfo')))
//     history.push({
//         pathname: `/view/${id}/${name}`,
//         financialData: props.financialData,
//         abbreviatedMarketCap: props.abbreviatedMarketCap
//     })
//     }
//     return (
//     <div>
//         <Button size="medium" onClick={()=> viewStock(props.id, props.name, props.row)}> More Info</Button>
//     </div>
//     )
// }

// export default ViewMoreInfo


import React, {Fragment, useState,Component, useEffect, useContext} from 'react'
import Chart from 'react-apexcharts'
import {CurrentStockContext} from '../../../context/currentStockContext';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SparkLineGraph from './sparkLineGraph'
const Charting = (props) => {
    const {currentStockInfo, setCurrentStockInfo} = useContext(CurrentStockContext)
    let history = useHistory()
    
    const viewStock = async (id, name, row) => {
    let stringRow = JSON.stringify(row)
    localStorage.setItem("currentStockInfo", stringRow);
    setCurrentStockInfo(JSON.parse(localStorage.getItem('currentStockInfo')))
    history.push({
        pathname: `/view/${id}/${name}`,
        financialData: props.financialData,
        abbreviatedMarketCap: props.abbreviatedMarketCap
    })
    }
    
return (

    <div style={{display: "flex", alignItems: "center", padding: "0", margin: "10"}}>
          {/* <SparkLineGraph/> */}
          {/* make eye */}
        {/* <Chart options={props.data.options} series={props.data.series} type="candlestick" height={100} width={300} /> */}
        <Button size="medium" onClick={()=> viewStock(props.id, props.name, props.row)}> More Info</Button>
    </div>
    )
}



export default Charting;