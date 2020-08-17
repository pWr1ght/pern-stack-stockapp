import React, {useState, createContext, useEffect} from 'react';

export const TableContext = createContext();

export const TableContextProvider = props => {
    function createData(symbol, stockChange, marketCap, sharePrice, chart) {
        return { symbol, stockChange, marketCap, sharePrice, chart};
    }
    const checkRows = () => {
        if(JSON.parse(localStorage.getItem('StockRows') === null)) {
            localStorage.setItem('StockRows', JSON.stringify([]))
            return []
        } else {
            return JSON.parse(localStorage.getItem('StockRows'))
        }
    }
    const [chartSwitch, setChartSwitch] = useState('Spark Chart')
    const [rows, setRows] = useState(checkRows())
   useEffect(() => {
       localStorage.setItem('StockRows', JSON.stringify(rows))
   }, [rows])

   return (
       <TableContext.Provider value={{rows, setRows, chartSwitch, setChartSwitch}}>
           {props.children}
       </TableContext.Provider>
   )
}
