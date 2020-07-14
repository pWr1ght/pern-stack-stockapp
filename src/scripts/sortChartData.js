export const rearangeData = (tickerData) => {
    let open = tickerData.o
    let high = tickerData.h
    let low = tickerData.l
    let close = tickerData.c
    var timeStamp = tickerData.t
   
    let candleStruct = open.map((o, i) => ({
      x: new Date(timeStamp[i] * 1000),
      y: [o, high[i], low[i], close[i]]
    }));

    // console.log("zip listing",candleStruct)
    let pracData = {
      volume: tickerData.v,
      symbol: tickerData.symbol,
      stockId: tickerData.stockId,
      series: [{
        data: candleStruct
      }],
      options: {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: `${tickerData.symbol}`,
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
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