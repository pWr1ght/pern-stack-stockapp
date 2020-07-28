module.exports = {
    yFinToApChart: (stockData) => {
        let newStockData = {
            c: [],
            h: [],
            l: [],
            o: [],
            t: [],
            v: []
        }
        
        stockData.records.map(element => {
            newStockData.c.push(element.close)
            newStockData.h.push(element.high)
            newStockData.l.push(element.low)
            newStockData.o.push(element.open)
            newStockData.t.push(element.time)
            newStockData.v.push(element.volume)
        })
        // console.log(newStockData)
        return newStockData;  
    }  
}