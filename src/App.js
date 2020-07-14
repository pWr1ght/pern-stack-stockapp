import React from 'react';
import './App.css';
import SearchStock from './components/searchStock'
import ViewStock from './components/viewStock'
import { StockContextProvider } from './context/stockContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import {TableContextProvider} from './context/tableContext'
import EnhancedTable from './components/stockTable'

function App() {
  return (
    
    <TableContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={EnhancedTable}></Route>
          <Route path="/view/:name/:id" component={ViewStock}></Route>
        </Switch>
      </Router>
        {/* <EnhancedTable/> */}
    </TableContextProvider>
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
