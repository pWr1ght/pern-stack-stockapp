import React, {useState, createContext} from 'react';

export const StocksContext = createContext();

export const StockContextProvider = props => {
   const [stocks, setStocks] = useState([])

   return (
       <StocksContext.Provider value={{stocks, setStocks}}>
           {props.children}
       </StocksContext.Provider>
   )
}



// import React, {useState, createContext} from 'react';

// export const StocksContext = createContext();

// export const StockContextProvider = props => {
//    const [stocks, setStocks] = useState({
//        stocklister: [],
//        chartData: [],
//        stockId: []
//    })
//    return (
//        <StocksContext.Provider value={{stocks, setStocks}}>
//            {props.children}
//        </StocksContext.Provider>
//    )
// }