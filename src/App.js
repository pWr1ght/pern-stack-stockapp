import React from 'react';
import './App.css';
import ViewStock from './components/viewStock'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import {TableContextProvider} from './context/tableContext'
import {CurrentStockContextProvider} from './context/currentStockContext'
import HomePage from './components/homePage'
import InteractiveBigChart from './components/interactiveChart'

function App() {
  return (
    
    <TableContextProvider>
      <CurrentStockContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/view/:id/:name/" component={ViewStock}></Route>
          <Route exact path="/view/interactive/:id/:name/" component={InteractiveBigChart}></Route>
        </Switch>
      </Router>
      </CurrentStockContextProvider>
    </TableContextProvider>
  );
}

export default App;
