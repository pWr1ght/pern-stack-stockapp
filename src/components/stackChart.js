import ReactApexChart from 'react-apexcharts'
import React, { useState,useEffect } from 'react'
import GetStocks from '../api/getStocks'

const StackChart = (props) => {
    const [seriesData, setSeries] = useState([0])
    const [dates, setDates] = useState([])

    useEffect(() => {
        const getRecommendations = async () => {
            let getReccomendationResponse = await GetStocks.get('/singlestock/reccomendation', {
              params: {
                stockName: props.symbol
              }
            })
            let recentRec = getReccomendationResponse.data[0]
            setSeries([recentRec.buy, recentRec.hold, recentRec.sell, recentRec.strongBuy,  recentRec.strongSell])
            setDates(recentRec.period)
        }
        getRecommendations()
    }, [])
    
    var state = {
          
        series: seriesData,
        options: {
          chart: {
            width: 380,
          },
          dataLabels: {
            enabled: false
          },
          title: {
            text: `Stock Reccomendation as of ${dates}`,
            style: {
                fontSize:  '20px',
                fontWeight:  'bold',
                color:  '#263238'
              },
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          labels: ["Buy", "Hold", "Sell", "StrongBuy", "StrongSell"],
          legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
          }
        },
      
      
      };
    
    

    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} height={404} type="donut" />
        </div>
    )
}

export default StackChart   