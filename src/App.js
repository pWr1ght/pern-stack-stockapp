import React from 'react';
import './App.css';
import ViewStock from './components/viewStock'
import {StockPortfolioContextProvider} from './context/stockPortfolio';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import {TableContextProvider} from './context/tableContext'
import {CurrentStockContextProvider} from './context/currentStockContext'
import {StockListContextProvider} from './context/stockListContext'
import HomePage from './components/homePage'
import InteractiveBigChart from './components/interactiveChart'

function App() {
  return (
    <StockPortfolioContextProvider>
      <StockListContextProvider>
        <TableContextProvider>
          <CurrentStockContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/view/:id/:name/" component={ViewStock}></Route>
              <Route exact path="/view/interactive/:id/:name/" component={InteractiveBigChart}></Route>
            </Switch>
          </Router>
            {/* <EnhancedTable/> */}
          </CurrentStockContextProvider>
        </TableContextProvider>
      </StockListContextProvider>
    </StockPortfolioContextProvider>
    // <StockContextProvider>
    //   <Router>
    //     <Switch>
    //         <Route exact path="/" component={SearchStock}></Route>
    //         <Route path="/view/:name/:id" component={ViewStock}></Route>
    //     </Switch>
    //   </Router>
    // </StockContextProvider>
  );
}

export default App;
