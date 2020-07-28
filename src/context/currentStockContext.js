import React, {useState, createContext} from 'react';

export const CurrentStockContext = createContext();

export const CurrentStockContextProvider = props => {
   const [currentStockInfo, setCurrentStockInfo] = useState(JSON.parse(localStorage.getItem('currentStockInfo')))

//    useEffect(() => {
//        setCurrentStockInfo()
//    }, [])

   return (
       <CurrentStockContext.Provider value={{currentStockInfo, setCurrentStockInfo}}>
           {props.children}
       </CurrentStockContext.Provider>
   )
}

