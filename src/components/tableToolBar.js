import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {TableContext} from '../context/tableContext';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    }));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {rows, setRows} = useContext(TableContext)
    const {setSelected, selected, numSelected } = props;

    const deleteRow = async () => {
        console.log(selected);
        const stayRowArray = props.rows.filter(row => 
            !selected.includes(row.symbol)
        )

        // const deleteRowArray = props.rows.filter(row => {
        //     if(selected.includes(row.symbol)) {
        //         return row;
        //     }
        // }).map(({chart}) => chart.stockId)
        
        setRows(stayRowArray);
        // console.log("this is leftOver", stayRowArray)
        // console.log(selected)
        setSelected([])
    }

    return (
        <Toolbar
        // className={clsx(classes.root, {
        //     [classes.highlight]: numSelected > 0,
        // })}
        >
        {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
            </Typography>
        ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Stocks
            </Typography>
        )}
        {/* button for Deleting   */}
        {numSelected > 0 ? (
            <Tooltip title="Delete">
            <IconButton style={{color: "white"}} onClick={deleteRow} aria-label="delete">
                <DeleteIcon />
            </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Filter list">
            <IconButton style={{color: "white"}} aria-label="filter list">
                <FilterListIcon />
            </IconButton>
            </Tooltip>
        )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
