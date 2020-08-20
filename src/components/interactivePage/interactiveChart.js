import React, {useRef} from 'react'
import {useHistory} from 'react-router-dom'
import indicators from "highcharts/indicators/indicators-all.js";
import dragPanes from "highcharts/modules/drag-panes.js";
import annotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import priceIndicator from "highcharts/modules/price-indicator.js";
import fullScreen from "highcharts/modules/full-screen.js";
import stockTools from "highcharts/modules/stock-tools.js";
import downloadFile from  "highcharts/modules/exporting"
import Highchartsd from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box'



// init the module
indicators(Highchartsd);
dragPanes(Highchartsd);
annotationsAdvanced(Highchartsd);
priceIndicator(Highchartsd);
fullScreen(Highchartsd);
stockTools(Highchartsd);

// DownloadFile(Highchartsd);
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#0C6BA7"
  },
  button: {
    color: "#C3EBF6",
    background: "rgb(64,80,181)"
  }
}));  

const InteractiveChart = (props) => {
    const chart = useRef(null);
    const history = useHistory()
    const classes = useStyles();
    
  var data = props.location.state.stockData;
  
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
const options = {
    navigation: {
      bindingsClassName: 'chart-1'
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
    chart: { 
      height: '900' 
    },
    series: [{
      type: 'ohlc',
      id: 'aapl-ohlc',
      name: 'AAPL Stock Price',
      data: ohlc
    }, {
      type: 'column',
      id: 'aapl-volume',
      name: 'AAPL Volume',
      data: volume,
      yAxis: 1
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 2000
        },
        chartOptions: {
          rangeSelector: {
            inputEnabled: false
          }
        }
      }]
    }
  };

  const onHandleBack = () => {
    console.log("hello")
    history.goBack();
  }
  
  return (
      <div className={classes.root}>
        <Box display="flex" p={1} color="#0C6BA7">
              <Box p={1} flexGrow={1}  bgcolor="#0C6BA7">
                <Button onClick={onHandleBack} className={classes.button} variant="contained" size="large" color="black">
                  <i className="fa-lg fas fa-angle-double-left"></i>
                </Button>
              </Box>
              <Box p={.5}  display="flex" justifyContent="center"  bgcolor="grey.300">
                <p style={{marginBottom: "0"}}>Note: For best interactivity, please full screen the chart</p>
              </Box>
        </Box>
          <HighchartsReact options={options} constructorType={'stockChart'} highcharts={Highchartsd} />
      </div>
  )
}

export default InteractiveChart;
