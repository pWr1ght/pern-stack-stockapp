import React from 'react'
import StockTable from './stockTable'
import CryptoCompare from "react-crypto-compare";
import CryptoTicker from './crytpoTicker'

// const ws = require('ws');
// var cryptocompareWS = new ws('wss://streaming.cryptocompare.com')

const HomePage = () => {
    return (
        <div>
            <CryptoTicker/>
            {/* <CryptoCompare from="EUR" to="BTC" amount={10} apikey="e1c95fb631253a9d74c36ede3dc3727850f583b8ed2e6ef50eb604ad43c6852a" />; */}
            <StockTable/>
        </div>
    )
}

export default HomePage;
