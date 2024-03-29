import React, {useState, createContext, useEffect} from 'react';
import URLlink from '../backendLink/getBackendURL'

export const CryptoContext = createContext();


export const CryptoContextProvider = props => {

    const checkCurrentCrypto = () => {
        if(((localStorage.getItem('currentCryptoName') === null))) {
            localStorage.setItem('currentCryptoName', JSON.stringify(['BTC', 'ETH', 'USDT', 'DASH', 'XRP', 'ADA']))
            return ['BTC', 'ETH', 'USDT', 'DASH', 'XRP', 'ADA']
        } else {
            return JSON.parse(localStorage.getItem('currentCryptoName')); 
        }
    }

    const [currentCrypto, setCryto] = useState(checkCurrentCrypto())
    //     const stickyValue = localStorage.getItem('currentCryptoName');
    //     const send = JSON.parse(stickyValue)
    //     console.log(send)
    //     return stickyValue !== null
    //       ? send
    //       : ['BTC', 'ETH', 'USDT', 'DASH'];
    //   })
    const [cryptoStorage, setCryptoStorage] = useState([{}])

    const updateCryptoStorage = async () => {
        let cryptoInfo = localStorage.getItem('currentCryptoInfo')
        let parsedCryptoDict = JSON.parse(cryptoInfo)
        let cryptoList= []
        currentCrypto.forEach(element => (
           cryptoList.push(parsedCryptoDict[element].USD)
        ));
        setCryptoStorage(cryptoList)
    }
    useEffect(() => {
        async function fetchData() {

            const response = await URLlink.get('/getCrypto');
            localStorage.setItem('currentCryptoInfo', JSON.stringify(response.data))
            await updateCryptoStorage();
          }
  
          fetchData();
    }, [])

    useEffect(() => {
        const currentStorageNames = localStorage.getItem('currentCryptoName');
        if(currentStorageNames !== null && localStorage.getItem('currentCryptoInfo') !== null) {
            localStorage.setItem('currentCryptoName', JSON.stringify(currentCrypto))
            updateCryptoStorage();
            // let  = localStorage.getItem('currentCryptoInfo') 
            // let j = JSON.parse(hello)
            // let list = []
            // currentCrypto.forEach(element => (
            //     list.push(j[element].USD)
            // ));
            // setCryptoStorage(list)
        }
    }, [currentCrypto])


    
    return (
        <CryptoContext.Provider value={{currentCrypto, setCryto, cryptoStorage, setCryptoStorage}}>
            {props.children}
        </CryptoContext.Provider>
    )
}

