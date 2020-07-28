import React from 'react'
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card'
import {useParams, useHistory} from 'react-router-dom'

const SingleVeiw = (props) => {
const history = useHistory()
var data = props.bigChartData
  
  var ohlc = [],
    volume = [],
    dataLength = data.length,
    groupingUnits = [
      [
        "week", // unit name
        [1] // allowed multiples
      ],
      ["month", [1, 2, 3, 4, 6]]
    ],
    i = 0;
  
  for (i; i < dataLength; i += 1) {
    ohlc.push([
      data[i][0], // the date
      data[i][1], // open
      data[i][2], // high
      data[i][3], // low
      data[i][4] // close
    ]);
  
    volume.push([
      data[i][0], // the date
      data[i][5] // the volume
    ]);
  }

  // Highcharts.stockChart('container',
  const options ={
    navigation: {
      bindingsClassName: 'chart-12'
    },
    yAxis: [{
      labels: {
        align: 'left'
      },
      height: '80%',
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'left'
      },
      top: '80%',
      height: '20%',
      offset: 0
    }],
    stockTools: {
      gui: {
          enabled: false // disable the built-in toolbar
      }
    },
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart,
          position;
  
        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop
          };
        }
  
        return position;
      }
    },
    series: [{
      type: 'ohlc',
      id: `${props.name}-ohlc`,
      name: `${props.name} Stock Price`,
      data: ohlc
    }, {
      type: 'column',
      id: `${props.name}-volume`,
      name: `${props.name} Volume`,
      data: volume,
      yAxis: 1
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 1500
        },
        chartOptions: {
          rangeSelector: {
            inputEnabled: false
          }
        }
      }]
    }
  };

  const interactWithChart = () => {
    history.push({
        pathname: `/view/interactive/${props.id}/${props.name}`,
        state: {stockData: props.bigChartData}
      })
  }
  
    return (
      <Card>
        <div style={{maxwidth:"1500px", height:"auto"}}>
          <div style={{ width: '100%' }}>
            <Box display="flex" p={1} bgcolor="background.paper">
              <Box p={2} flexGrow={1}  bgcolor="grey.300">
                {props.generalData.longName} ({props.name}) <span style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "14px"}}>{props.generalData.exchangeTimezoneName} </span>
              </Box>
              <Box p={1} bgcolor="grey.300">
                <Button onClick={interactWithChart} variant="outlined" color="primary">Switch to Analysis Mode</Button>
              </Box>
            </Box>
          </div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
                />
        </div>
      </Card>
    )
}

export default SingleVeiw