import React from 'react';
import './App.css';
import ViewStock from './components/viewStockPage/viewStock'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import {TableContextProvider} from './context/tableContext';
import {CurrentStockContextProvider} from './context/currentStockContext';
import {CryptoContextProvider} from './context/cryptoContext';
import HomePage from './components/homePage/homePage';
import InteractiveBigChart from './components/interactivePage/interactiveChart';

function App() {
  return (
    <div className="">
    <TableContextProvider>
      <CurrentStockContextProvider>
        <CryptoContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/view/:id/:name/" component={ViewStock}></Route>
              <Route exact path="/view/interactive/:id/:name/" component={InteractiveBigChart}></Route>
            </Switch>
          </Router>
        </CryptoContextProvider>
      </CurrentStockContextProvider>
    </TableContextProvider>
    </div>
  );
}

export default App;
