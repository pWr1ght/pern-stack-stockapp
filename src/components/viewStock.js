import React, {Fragment, useState, useEffect, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import BigStockChart from './bigStockChart';
import GetStocks from '../api/getStocks'
import Button from '@material-ui/core/Button';
import { Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StockCard from './stockCard';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box'
import StackChart from './stackChart'
import StockNewsListItem from './stockNewsListItem.js'
import {CurrentStockContext} from '../context/currentStockContext';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#0C6BA7'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    background: '#C3EBF6'
  },
}));


const ViewStock = () => {
    const history = useHistory()
    const {currentStockInfo, setCurrentStockInfo} = useContext(CurrentStockContext)
    const [bigChartData, setBigChartData] = useState([]);
    const [articles, setArticles] = useState([])
    //passing params from route
    const {id, name} = useParams();



    const onHandleBack = () => {
        history.goBack();
    }

    useEffect( () => {
        // let currentStockRow = JSON.parse(localStorage.getItem("currentStockInfo"))
        // setCurrentStockInfo(currentStockRow)
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
        fetchChartData(id, name)
        fetchNews(currentStockInfo.financialData.displayName)
    }, [])
    

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <button onClick={() => console.log(currentStockInfo)}>currentInfo</button>
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

            </Container>
            
        </div>
    )
}

export default ViewStock
