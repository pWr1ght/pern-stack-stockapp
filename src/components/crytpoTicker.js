import React, {useState, useEffect, useContext} from 'react'
import Ticker from 'react-ticker'
import URLlink from '../backendLink/getBackendURL'
import CryptoCompare from 'react-crypto-compare';
import {CryptoContext} from '../context/cryptoContext';
import CryptoOptions from './cryptoButtons';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import '../styles/cryptoStyle.css'
import { wrap } from 'highcharts';

// const GetRatesFromAPI = (props) => {
   
   
//     // A placeholder is needed, to tell react-ticker, that width and height might have changed
//     // It uses MutationObserver internally
//     return props.rates ? (
//       <p style={{ whiteSpace: "nowrap" }}>{props.rates} +++ </p>
//     ) : (
//       <p style={{ visibility: "hidden" }}>Placeholder</p>
//     );
//   };

  function StockTicker() {
    // const [rates, setRates] = useState("");
    const {currentCrypto, setCryto, cryptoStorage, setCryptoStorage } = useContext(CryptoContext)
    const [cryptoInfo, setCryptoInfo] = useState([{}])

    useEffect(() => {
        // async function fetchData() {
        //   const response = await URLlink.get('/getCrypto');
        //   localStorage.setItem('currentCryptoInfo', JSON.stringify(response.data))
        //   // currentCrypto()
        //   let hello = localStorage.getItem('currentCryptoInfo')
        //   let j = JSON.parse(hello)
        //   // setCryptoInfo(j)
        //   let list = []
        //   currentCrypto.forEach(element => (
        //      list.push(j[element].USD)
        //   ));
        //   setCryptoInfo(list)
        //   list.forEach(crypto => console.log((crypto)))
        // }

        // fetchData();
      }, []);
      const fixingToFloat = (CHANGEPCTDAY) => {
        const value = (Math.round(CHANGEPCTDAY * 100) / 100).toFixed(2)
        return value
        // const value = CHANGEPCTDAY.toString()
        // const hell = value.toFixed(2)

        // return hell
      }
    return (
      <div>
        <div className="flexBoxContainer" style={{flexWrap: "no-wrap", background: "rgb(34,34,34)"}}>
          {/* <div className="flexbox-item2 flexbox-item">
            <div className="tickerBox tickerFont" style={{textAlign: "center"}}>
              <div>BTC - Price: 14539</div>
              <div>164.34 ^ (1.36)</div>
            </div>
          </div>
          <div className="flexbox-item2 flexbox-item">
            
            <div className="tickerBox tickerFont" style={{textAlign: "center"}}>
              <div>BTC - Price: 14539</div>
              <div>164.34 ^ (1.36)</div>
            </div>
          </div>
          <div style={{width: '2px', background: 'grey', margin: "5px", height: "70px"}}></div>
          <div className="flexbox-item2 flexbox-item">
            <div className="tickerBox" style={{textAlign: "center"}}>
              <div>BTC - Price: 14539</div>
              <div>164.34 ^ (1.36)</div>
            </div>
          </div>
          <div style={{width: '2px', background: 'grey', margin: "5px", height: "70px"}}></div>
          <div className="flexbox-item2 flexbox-item">
            <div className="tickerBox" style={{textAlign: "center"}}>
              <div>BTC - Price: 14539</div>
              <div>164.34 ^ (1.36)</div>
            </div>
          </div>
          <div style={{width: '2px', background: 'grey', margin: "5px", height: "70px"}}></div>
          <div className="flexbox-item2 flexbox-item">
            <div className="tickerBox" style={{textAlign: "center"}}>
              <div>BTC - Price: 14539</div>
              <div>164.34 ^ (1.36)</div>
            </div>
          </div>
          <div style={{width: '2px', background: 'grey', margin: "5px", height: "70px"}}></div>
          <div className="flexbox-item2 flexbox-item">
            <div className="tickerBox tickerFont" style={{textAlign: "center"}}>
              <div>BTC - Price: 14539</div>
              <div>164.34 ^ (1.36)</div>
            </div>
          </div>
          <div style={{width: '2px', background: 'grey', margin: "5px", height: "70px"}}></div>
          <div className="flexbox-item2 flexbox-item">
            <div className="tickerBox" style={{textAlign: "center"}}>
              <div>BTC - Price: 14539</div>
              <div>164.34 ^ (1.36)</div>
            </div>
          </div>
          <div style={{width: '2px', background: 'grey', margin: "5px", height: "70px"}}></div>
          <div className="flexbox-item2 flexbox-item">
            <div className="tickerBox" style={{textAlign: "center"}}>
              <div>BTC - Price: 14539</div>
              <div>164.34 ^ (1.36)</div>
            </div>
          </div>
          <div style={{width: '2px', background: 'grey', margin: "5px", height: "70px"}}></div>
          <div className="flexbox-item2 flexbox-item">
            <div className="tickerBox" style={{textAlign: "center"}}>
              <div>BTC - Price: 14539</div>
              <div>164.34 ^ (1.36)</div>
            </div>
          </div>
          <div style={{width: '2px', background: 'grey', margin: "5px", height: "70px"}}></div>
          
          <div className="flexbox-item3 flexbox-item"></div> */}
          {/* <Grid container spacing={3}>
            <Grid item xs>
              <Paper>xs</Paper>
            </Grid>
            <Grid item xs>
              <Paper>xs</Paper>
            </Grid>
            <Grid item xs>
              <Paper >xs</Paper>
            </Grid>
          </Grid> */}
            {/* <div style={{background: "rgb(34,34,34)", color: "white", display: "flex",}}>
              {cryptoStorage.map(crypto => 
                <div style={{textAlign: "center",justifyContent: "center", display: "flex", marginLeft: "10px",marginTop: "10px"}}>
                  {(`${crypto.FROMSYMBOL} Price: ${crypto.PRICE}`)}<div style={{display: "flex"}}>{fixingToFloat(crypto.CHANGEPCTDAY)}</div><div style={{width: '2px', background: 'grey', margin: "5px", height: "70px"}}>
                  </div>
                </div>)}
                <div style={{display: "flex", justifyContent: "flex-end", color: "white"}}> 
                  <CryptoOptions/>
                </div>
            </div> */}
            
            <div style={{background: "rgb(34,34,34)", color: "white", display: "flex"}}>
              {cryptoStorage.map(crypto => 
                <div className="flexbox-item2 flexbox-item">
                  <div className="tickerBox" style={{textAlign: "center"}}>
                    <div>{(`${crypto.FROMSYMBOL} Price: ${crypto.PRICE}`)}</div>
                    <div>{fixingToFloat(crypto.CHANGEPCTDAY)}</div>
                  </div>
                </div>)}
                <div style={{display: "flex", justifyContent: "flex-end", color: "white"}}> 
                  <CryptoOptions/>
                </div>
            </div>
        </div>
        <div className="spaceBar">
          
        </div>
        {/* <div className="searchBar">
        <h1 style={{color: "white"}}>Welcome to your Stock Portfolio</h1>
          
        </div> */}
      </div>
        
    //   <Ticker offset="run-in" speed={3}>
    //     {/* {() => <GetRatesFromAPI rates={rates} />} */}
    //   </Ticker>
    );
  }
   
  export default StockTicker;