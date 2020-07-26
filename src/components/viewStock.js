import React, {Fragment, useState, useEffect, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import { StocksContext } from '../context/stockContext';
import BigStockChart from './bigStockChart';
import InteractiveChart from './interactiveChart'
import axios from 'axios';
import GetStocks from '../api/getStocks'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'; 
import Button from '@material-ui/core/Button';
import { Container, Divider } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StockCard from './stockCard';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Box from '@material-ui/core/Box'
import StackChart from './stackChart'
import StockNewsListItem from './stockNewsListItem.js'
import {TableContext} from '../context/tableContext';
import {CurrentStockContext} from '../context/currentStockContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const ViewStock = (props) => {
    const history = useHistory()
    const {currentStockInfo, setCurrentStockInfo} = useContext(CurrentStockContext)
    // const {stocks, setStocks} = useContext(StocksContext)
    const [bigChartData, setBigChartData] = useState([]);
    const [articles, setArticles] = useState([])
    // const {rows, setRows} = useContext(TableContext)
    // const [currentRowInfo, setCurrentRowInfo] = useState()
    //passing params from route
    const {id, name} = useParams();



    const onHandleBack = () => {
        console.log("hello")
        history.goBack();
    }

    useEffect( () => {
        // localStorage.localStorage.setItem("currentStockInfo", currentStockInfo);
        let currentStockRow = JSON.parse(localStorage.getItem("currentStockInfo"))
        setCurrentStockInfo(currentStockRow)
        // console.log("Is this the row you picked, ", currentStockInfo)
        //setting up BigChart data
        const fetchChartData = async (id, name) => {
            try {
                let response = await GetStocks.get(`/singlestock/${id}/${name}`)
                setBigChartData(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        //fetching News
        const fetchNews = async (name) => {
            try{
            const getNewsResponse = await GetStocks.get('/singlestock/news', {
                params: { stockName: name}
            })
            let getTopTenNewsArticles = (getNewsResponse.data).slice(0, 10)
            setArticles(getTopTenNewsArticles)
            }
            catch (err)
            {
                console.log("No news")
            }
        }
        //Retreiving stock from the rows
        // const currentStockInfo = rows.filter(row => row.stockId == id)
        // console.log("this is current stock info", currentStockInfo, id)
        // setCurrentRowInfo(currentStockInfo)
        fetchChartData(id, name)
        // console.log(currentStockInfo[0].financialData.displayName)
        // fetchNews(props.location.financialData.displayName)
        // [0].financialData.displayName
        fetchNews(currentStockRow.financialData.displayName)
    }, [])
    
    const interactWithChart = () => {
        history.push({
            pathname: `/view/interactive/${id}/${name}`,
            state: {stockData: bigChartData}
          })
    }

    const classes = useStyles();
    return (
        <div>
            <button onClick={() => console.log(currentStockInfo)}>currentInfo</button>
            {/* <button onClick={() => console.log(rows)}>rows</button> */}
            {/* <button onClick={() => console.log(statistics)}>stats</button> */}
            {/* <button onClick={() => console.log(props.location.financialData)}>Find Location</button> */}
            <Button variant="outlined" size="large" color="primary">
                <i onClick={onHandleBack} class="far fa-arrow-alt-circle-left"></i>
            </Button>   
            <Container style={{maxWidth: "1500px"}}>
                <Grid container spacing={3}>
                    <Grid item lg={8}>
                        <Paper className={classes.paper}>
                            <BigStockChart id={id} name={name} bigChartData={bigChartData}/>
                        </Paper>
                    </Grid>
                    <Grid item lg={4}>
                        <Paper className={classes.paper}>
                            <StockCard name={name} abbreviatedMarketCap={currentStockInfo.abMarketCap} cardData={currentStockInfo.financialData}/>
                        </Paper>
                    </Grid>
                    <Grid item lg={6}>
                        <Paper className={classes.paper}>
                            <Box display="flex" p={1} bgcolor="background.paper">
                                <Box p={2} flexGrow={1}  bgcolor="grey.300">
                                    Recent News
                                </Box>
                            </Box>
                            {/* <StockNewsList/> */}
                            <Paper style={{maxHeight: 330, overflow: 'auto'}}>
                                <List>
                                    {
                                        articles && articles.map(item => (
                                        <StockNewsListItem title={item.title} link={item.link} date={item.pubDate}/>))
                                    }
                                </List>
                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid item lg={6}>
                        <Paper className={classes.paper}>
                            <StackChart symbol={name}/>
                        </Paper>
                    </Grid>
                    </Grid>
            </Container>
            <Container>
                {/* <button onClick={onHandleBack}><i onClick={onHandleBack} class="far fa-arrow-alt-circle-left"></i></button> */}
                {/* <button onClick={interactWithChart}>Link</button> */}
                {/* <BigStockChart symbol={name} stockFinanceData={stockFinanceData}/> */}
            </Container>
            
        </div>
    )
}

export default ViewStock
