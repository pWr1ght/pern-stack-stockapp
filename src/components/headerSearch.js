import React, {useContext, useState, useEffect} from 'react';
import {TextField, Button} from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {rearangeData} from '../sortDataFunctions/sortChartData';
import {TableContext} from '../context/tableContext';
import backendURL from '../backendLink/getBackendURL';
import '../styles/style.css'
import SparkLineGraph from './sparkLineGraph'

const HeaderSearch = () => {
    const {rows, setRows} = useContext(TableContext);
    const [currentTicker, setCurrentTicker] = useState('');
    const [symbolError, setSymbolError] = useState(false);
    const [marketStatus, setMarketStatus] = useState(false);
  

    // the function that grabs the rows
    function createData(symbol, stockChange, marketCap, sharePrice, chart, financialData, imageInfo, stockId, abMarketCap) {
      return { symbol, stockChange, marketCap, sharePrice, chart, financialData, imageInfo, stockId, abMarketCap};
    }

    useEffect(() => {
      const getStatus = async () => {
        const marketStatusReponse = await backendURL.get('/checkMarketStatus');
        const marketStatusDesicion = marketStatusReponse.data 
        if(marketStatusDesicion) {
            setMarketStatus(true)
          } else {
            setMarketStatus(false)
          }
      }
      getStatus();
    }, [])

    function abbreviateNumber(value) {
        let newValue = value;
        if (value >= 1000) {
            let suffixes = ["", "K", "M", "B","T"];
            let suffixNum = Math.floor( (""+value).length/3 );
            let shortValue = '';
            for (let precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
            newValue = shortValue+suffixes[suffixNum];
        }
        return newValue;
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
  
        let submit = true;
        rows.map(row => {
          if((row.symbol) == currentTicker.trim()){
            submit = false;
          }
        })
        if(submit) {
          let now = new Date().getTime()
          let current = parseInt(now/1000)
          let month = current - (86400 * 31)
  
          //vestigal adding of uneeded user_id
          const addingResponse = await backendURL.post('/', {
            user_id: '1',
            ticker: currentTicker,
            from: month,
            to: current
          })
  
          if(addingResponse.data.length == 0) {
            console.log("ticker not supported")
            setSymbolError(true)
          } else {
            setSymbolError(false)
            const responseData = rearangeData(addingResponse.data)
            setRows((prevRows) => 
              [...prevRows,...[createData(`${currentTicker}`,
                responseData.priceChange,
                responseData.marketCap,
                responseData.currentPrice,
                {
                stockId: responseData.stockId,
                options: responseData.options,
                series: responseData.series
                },
                responseData.yahooSummaryData,
                responseData.imageInfo,
                responseData.stockId,
                abbreviateNumber(responseData.marketCap)
                )
              ]])
          }
        }
        else {
          console.log("Already entered the stock")
        }
        setCurrentTicker('');
      }
    return (
      <div>

        <div className="header">
            {/* <Container maxWidth="sm" > */}
            {/* "headerbackDrop" */}
              <div className="" style={{ textAlign: "center"}}>
              <h1 >Welcome to your Portfolio</h1>
                  {/* input */}
                </div>
            {/* </Container> */}
            <Container maxWidth="sm" className="text-center">
              <form onSubmit={onSubmitForm} noValidate autoComplete="off">
                <div className="searchTool">
                  {!symbolError ? (
                    <TextField id="standard-basic"
                      label="Please Enter your Stock Ticker (AAPL, BA, GE, AMZN)"
                      text="text" className="form-control"
                      value={currentTicker} 
                      onChange={e => setCurrentTicker(e.target.value)}/>
                    ) : (
                      <TextField
                      error
                      className="form-control"
                      id="standard-error-helper-text"
                      label="Ticker not supported"
                      value={currentTicker} 
                      onChange={e => setCurrentTicker(e.target.value)}
                    />
                    ) 
                  }
                    <ButtonGroup
                        color="primary"
                        aria-label="contained primary button group"
                        variant="contained"
                    >
                    <Button color="primary" style={{backgroundColor: "rgb(27,66,76)", padding: "12px"}} type="submit">Add</Button>
                    </ButtonGroup>
                </div>
              </form>
            </Container>
        </div>
        {/* <div className="spacerBarFlexEnd">
          {marketStatus ? <div style={{lineHeight: "1.6"}}><h4 style={{color: 'green', marginTop: "-10px", marginBottom: "-20px", lineHeight: "1.6"}}>Market Open</h4></div> : <div style={{color: 'red', marginRight: "20px", marginBottom: "-20px"}}><h4 style={{lineHeight: "1.6"}}>Market Closed</h4></div>}
        </div> */}
      </div>
    )
}

export default HeaderSearch
