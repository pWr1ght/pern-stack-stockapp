import React from 'react'
import StockTable from './mainTableParts/stockTable'
import CryptoCompare from "react-crypto-compare";
import CryptoTicker from './crytobar/crytpoTicker'
import SearchHeader from './headerSearch';
import './../../styles/style.css'

// const ws = require('ws');
// var cryptocompareWS = new ws('wss://streaming.cryptocompare.com')

const HomePage = () => {
    return (
        <div>
            <CryptoTicker/>
            <SearchHeader/>
            <StockTable/>
            <div className="footerStyle"></div>
        </div>
    )
}

export default HomePage;
