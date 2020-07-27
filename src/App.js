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
import { AnimatedSwitch } from 'react-router-transition';

function App() {
  return (
    <StockPortfolioContextProvider>
      <StockListContextProvider>
        <TableContextProvider>
          <CurrentStockContextProvider>
          <Router>
          <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      
    >
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/view/:id/:name/" component={ViewStock}></Route>
              <Route exact path="/view/interactive/:id/:name/" component={InteractiveBigChart}></Route>
              </AnimatedSwitch>
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
