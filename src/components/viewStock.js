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
    // const {stocks, setStocks} = useContext(StocksContext)
    const [stockFinanceData, setStockFinanceData] = useState([]);
    const [articles, setArticles] = useState([])

    //passing params from route
    const {id, name} = useParams();



    const onHandleBack = () => {
        console.log("hello")
        history.goBack();
    }

    useEffect( () => {
        const fetchChartData = async (id, name) => {
            try {
                let response = await GetStocks.get(`/singlestock/${id}/${name}`)
                console.log(response);
                setStockFinanceData(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        const fetchNews = async () => {
            try{
            const getNewsResponse = await GetStocks.get('/singlestock/news', {
                params:{ stockName: 'Apple'}
            })
            let getTopTenNewsArticles = (getNewsResponse.data).slice(0, 10)
            
            console.log(getTopTenNewsArticles)
            setArticles(getTopTenNewsArticles)
            }
            catch (err)
            {
                console.log("No news")
            }
        }
        fetchChartData(id, name)
        fetchNews(name)
    }, [])
    
    const interactWithChart = () => {
        history.push({
            pathname: `/view/interactive/${id}/${name}`,
            state: {stockData: stockFinanceData}
          })
    }

    const classes = useStyles();
    return (
        <div>
            <button onClick={() => console.log(props.location.financialData)}>Find Location</button>
            <Button variant="outlined" size="large" color="primary">
                <i onClick={onHandleBack} class="far fa-arrow-alt-circle-left"></i>
            </Button>   
            <Container style={{maxWidth: "1500px"}}>
                <Grid container spacing={3}>
                    <Grid item lg={8}>
                        <Paper className={classes.paper}>
                            <BigStockChart id={id} name={name} stockFinanceData={stockFinanceData}/>
                        </Paper>
                    </Grid>
                    <Grid item lg={4}>
                        <Paper className={classes.paper}>
                            <StockCard name={name} abbreviatedMarketCap={props.location.abbreviatedMarketCap} cardData={props.location.financialData}/>
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
                            <StackChart/>
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
