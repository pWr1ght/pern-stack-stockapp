import React, {useState, useEffect, createContext} from 'react';
import uuid from 'uuid/dist/v1'
export const StockListContext = createContext();

export const StockListContextProvider = props => {
    const [stockList, setStockList] = useState([
        {ticker: 'AAPL', portfolioNum: 1, id: 1},
        {ticker: 'AMZN', portfolioNum: 1, id: 2}
    ])
    
    const addStock = (ticker, portfolioNum) => {
        setStockList([...stockList, {ticker, portfolioNum, id: uuid()}])
    }

    const removeStock = (id) => {
        setStockList(stockList.filter(stock => stock.id !== id))
    }
    // useEffect(() => {
    //     localStorage.setItem('stockList', JSON.stringify(stockList))
    // }, [stockList])
    return (
        <StockListContext.Provider value={{stockList, setStockList, addStock, removeStock}}>
            {props.children}
        </StockListContext.Provider>
    )
}
