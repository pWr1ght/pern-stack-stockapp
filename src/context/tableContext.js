import React, {useState, createContext} from 'react';

export const TableContext = createContext();

export const TableContextProvider = props => {
    function createData(symbol, stockChange, marketCap, sharePrice, chart) {
        return { symbol, stockChange, marketCap, sharePrice, chart};
    }
   const [rows, setRows] = useState([])
   const [money, setMoney] = useState([createData('BA', 305, 3.7, 67, 4.3)])

   return (
       <TableContext.Provider value={{rows, setRows, money, setMoney}}>
           {props.children}
       </TableContext.Provider>
   )
}
