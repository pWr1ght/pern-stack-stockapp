import React, {useState, createContext, useEffect} from 'react';

export const TableContext = createContext();

export const TableContextProvider = props => {
    function createData(symbol, stockChange, marketCap, sharePrice, chart) {
        return { symbol, stockChange, marketCap, sharePrice, chart};
    }
    const [rows, setRows] = useState(JSON.parse(localStorage.getItem('StockRows')))
   useEffect(() => {
       localStorage.setItem('StockRows', JSON.stringify(rows))
   }, [rows])

   return (
       <TableContext.Provider value={{rows, setRows}}>
           {props.children}
       </TableContext.Provider>
   )
}
