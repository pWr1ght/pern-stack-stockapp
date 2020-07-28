import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../styles/cardStyle.css'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import StockPriceDisplay from './stockArrow'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      minHeight: 478,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    changePrices: {
      color: 'green'
    },
  });


const StockCard = (props) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const getTime = (time) => {
      let date = new Date(time * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = date.getFullYear();
      var month = months[date.getMonth()];
      var day = date.getDate();
      let fullDate = `${month} ${day}, ${year}`
      return fullDate;
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                    <Typography style={{textAlign: "center"}} variant="h3">
                      {props.name}
                    </Typography>
                    <Typography style={{lineHeight: "1"}} variant="h3">
                        {props.cardData.regularMarketPrice.toFixed(2)} <span style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "16px"}}>({props.cardData.financialCurrency})</span>
                    </Typography>
                    <div>
                    <div style={{lineHeight: "1", display: "flex", justifyContent: "start"}} >
                      <StockPriceDisplay break={false} dollarChange={props.cardData.regularMarketChange} percentageChange={props.cardData.regularMarketChangePercent}/>
                    </div>
                </div>
                <br/>
                <h4>Summary</h4>
                <Divider/>
                <div className="cardContainer">
                    <div className="item">Days Range:
                    <div>{props.cardData.regularMarketDayRange}</div></div>
                    <div className="item">52 Week Range:
                    <div >{props.cardData.fiftyTwoWeekRange}</div></div>
                    <div><Divider/></div>
                    <div><Divider/></div>
                    <div className="item">Open: {props.cardData.regularMarketOpen}</div>
                    <div className="item">Previous Close: {props.cardData.regularMarketPreviousClose} </div>
                    <div><Divider/></div>
                    <div><Divider/></div>
                    <div  className="item">Trailing 12 mo. EPS: {props.cardData.epsTrailingTwelveMonths.toFixed(2)}</div>
                    <div  className="item">Trailing PE: {!isNaN(props.cardData.trailingPE) ? (props.cardData.trailingPE.toFixed(2)) : (props.cardData.trailingPE)}</div>
                    <div><Divider/></div>
                    <div><Divider/></div>
                    <div className="item">MarketCap: {props.abbreviatedMarketCap} </div>
                    <div className="item">Earnings Date: {getTime(props.cardData.earningsTimestampStart)} </div>
                </div>
            </CardContent>
        </Card>
  );
}

export default StockCard
