import React, {useEffect, useState} from 'react'
import backendURL from '../backendLink/getBackendURL'
import '../styles/style.css'

const MarketStatus = () => {
    const [marketStatus, setMarketStatus] = useState(false);

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

    return (
        <div>
            <div className="spacerBarFlexEnd" style={{marginBottom: "40px"}}>
                {marketStatus ? <div style={{lineHeight: "1.6"}}><h4 style={{color: 'green', marginTop: "-10px", marginBottom: "-20px", lineHeight: "1.6"}}>Market Open</h4></div> : <div style={{color: 'red', marginRight: "20px", marginBottom: "-20px"}}><h4 style={{lineHeight: "1.6"}}>Market Closed</h4></div>}
            </div>
        </div>
    )
}

export default MarketStatus
