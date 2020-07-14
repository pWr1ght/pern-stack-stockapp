await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${posting}&resolution=D&from=${month}&to=${current}&token=`)
                .then(res => {
                    console.log(res)
                    if(res.body.error == "Symbol not supported.") {
                        console.log("don't add to list");
                    }
                    else{
                        res.symbol = posting
                        let sanitizedData = ModifyDataForChart(res.data)
                        allTick.push(sanitizedData)
                        // setStockInput([...stock, posting])
                        // setstockData(data)
                        // display(data)
                    }
                    // Promise.all(hello)
                    let NewItem = []
                    console.log(allTick)
                    // console.log([...item, allTick])
                    setItem(allTick)
                    })
                .catch(err => err.message)