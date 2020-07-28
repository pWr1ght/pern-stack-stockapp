// uncomment this is for yahoo finance chart data initial stock aquiring

// const calcDollarChange = (pricesArray) => {
//   console.log(pricesArray[1].y[3] + " " + "- " + pricesArray[0].y[3])
//   let dayDollarChange = pricesArray[1].y[3] - pricesArray[0].y[3]
//   console.log("calcDollarChange", dayDollarChange)
//   return dayDollarChange
// }

// const calcPercChange = (pricesArray) => {
//   console.log(pricesArray)
//   console.log(pricesArray[1].y[3] + " " + "/ " + pricesArray[0].y[3])
//   let dayDollarChange = (((pricesArray[1].y[3] / pricesArray[0].y[3]) - 1)*100)
//   return dayDollarChange
// }

// const getCurrentPrice = (pricesArray) => {
//   console.log("calcCurrentChange", pricesArray)
//   return pricesArray[0].y[3];
// }

export const rearangeData = (tickerData) => {
    let open = tickerData.o
    let high = tickerData.h
    let low = tickerData.l
    let close = tickerData.c
    var timeStamp = tickerData.t

    // using finhub for month data
    let candleStruct = open.map((o, i) => ({
      x: new Date(timeStamp[i] * 1000),
      y: [o, high[i], low[i], close[i]]
    }));
    
    // let recentMonthData = candleStruct.slice(-22)
    
    // console.log("zip listing",candleStruct)


    let pracData = {
      //uncomment this is for yahoo finance chart data initial stock aquiring

      // diffDayChange: calcDollarChange(candleStruct.slice(-2)),
      // currentPrice: getCurrentPrice(candleStruct.slice(-1)),
      // dayPercChange: calcPercChange(candleStruct.slice(-2)),
      // oneYearData: candleStruct,

      //comment out if using yahoo as initial data aquiring
      imageInfo: tickerData.imageInfo,
      yahooSummaryData: tickerData.dataSummary,
      priceChangePercent: tickerData.dataSummary.regularMarketChangePercent,
      priceChange: tickerData.dataSummary.regularMarketChange, 
      marketCap: tickerData.dataSummary.marketCap,
      currentPrice: tickerData.dataSummary.regularMarketPrice,
      volume: tickerData.v,
      symbol: tickerData.symbol,
      stockId: tickerData.stockId,
      series: [{
        data: candleStruct
      }],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          type: 'candlestick',
          height: 350
        },
        // title: {
        //   text: `${tickerData.symbol}`,
        //   align: 'left'
        // },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          forceNiceScale: true,
          // floating: true,
          // decimalsInFloat: true,
          // floating: true,
          decimalsInFloat: true,
 
          tooltip: {
            onDatasetHover: {
              highlightDataSeries: false,
          },
            show: false,
            enabled: false,
          }
          
        }
      },
    };
    // for(let i = 0; i < candleStruct.length; i++) {
    //   pracData.series[0].data.push(candleStruct[i])
    // }

    return pracData;
  }
// exports.module = ModifyDataForChart;

// export 
// module.exports = {
//   test: ModifyDataForChart = (tickerData) => {
//     let a = tickerData.o
//     let b = tickerData.h
//     let c = tickerData.l
//     let d = tickerData.c
//     var t = tickerData.t
//     console.log(a)
//     console.log(tickerData)
//     let candleStruct = a.map((e, i) => ({
//       x: new Date(t[i] * 1000),
//       y: [e, b[i], c[i], d[i]]
//     }));

//     // console.log("zip listing",candleStruct)
//     let pracData = {
//       stockId: tickerData.stockId,
//       series: [{
//         data: candleStruct
//       }],
//       options: {
//         chart: {
//           type: 'candlestick',
//           height: 350
//         },
//         title: {
//           text: `${tickerData.symbol}`,
//           align: 'left'
//         },
//         xaxis: {
//           type: 'datetime'
//         },
//         yaxis: {
//           tooltip: {
//             enabled: true
//           }
//         }
//       },
//     };
//     // for(let i = 0; i < candleStruct.length; i++) {
//     //   pracData.series[0].data.push(candleStruct[i])
//     // }

//     return pracData;
//   }
// }