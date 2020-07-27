import React, {useState, useEffect, createContext} from 'react';
import uuid from 'uuid/dist/v1'
export const StockPortfolioContext = createContext();

export const StockPortfolioContextProvider = props => {
    const checkStorage = () => {
        let Item = JSON.parse(localStorage.getItem('portfolios'))
        if(Item) {
            return
        }  else {
            return  {portfolioNum: 0, portfolio: [], id: uuid()}
        }
    }
    const [portfolios, setPortfolio] = useState([
        checkStorage()
    ])
    const [portfolioCount, setPortfolioCount] = useState(0);
    
    const addPortfolio = (number) => {
        let portCount = portfolioCount + 1
        setPortfolioCount(prevState => prevState + 1)
        setPortfolio([...portfolios, {portfolioNum: portCount, portfolio: [], id: uuid()}])
    }
    
    const portfolioCountUp = () => {
        if(portfolioCount <= 3) {
            setPortfolioCount(prevState => prevState + 1)
        }
    }

    const portfolioCountDown = () => {
        if(portfolioCount <= 0) {
            setPortfolio(prevState => prevState - 1)
        }
    }

    const totalPortFolioCount = () => {
        let number = portfolios.length
        return console.log(portfolios.length);
    }

    const removePortfolio = (num) => {
        setPortfolio(portfolios.filter(portfolio => portfolio.portfolioNum !== num))
    }
    useEffect(() => {
        localStorage.setItem('portfolios', JSON.stringify(portfolios))
    }, [portfolios])
    return (
        <StockPortfolioContext.Provider value={{setPortfolio, portfolios, portfolioCount, addPortfolio, removePortfolio, portfolioCountUp, portfolioCountDown, totalPortFolioCount}}>
            {props.children}
        </StockPortfolioContext.Provider>
    )
}
