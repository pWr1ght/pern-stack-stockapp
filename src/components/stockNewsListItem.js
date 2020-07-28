import React, { Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Container, Divider } from '@material-ui/core';
var parse = require('html-react-parser');

const StockNewsList = (props) => {
    const trimDate = (date) => {
        return date.slice(0, -13)
    }
    return (
        <Fragment>
            <ListItem>
                <div style={{direction: "column"}}>
                    <a href={props.link} >{parse(props.title)}</a>
                </div>
                <ListItemText secondary={trimDate(props.date)} />
            </ListItem>
            <Divider/>
        </Fragment>
    )
}

export default StockNewsList;
