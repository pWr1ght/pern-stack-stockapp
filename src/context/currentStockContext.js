import React, {useState, createContext} from 'react';

export const CurrentStockContext = createContext();

export const CurrentStockContextProvider = props => {
   const [currentStockInfo, setCurrentStockInfo] = useState({stats: "this is stats"})

   return (
       <CurrentStockContext.Provider value={{currentStockInfo, setCurrentStockInfo}}>
           {props.children}
       </CurrentStockContext.Provider>
   )
}

