import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, FormHelperText} from '@material-ui/core/';
import {TextField, Button} from '@material-ui/core/'
import {TableContext} from '../context/tableContext';


const headCells = [
  { id: 'symbol', direction: 'left', disablePadding: false, label: 'Stock Ticker' },
  { id: 'stockChange', direction: 'right', disablePadding: false, label: 'Day Change' },
  { id: 'marketCap', direction: 'right', disablePadding: false, label: 'marketCap (USD) ' },
  { id: 'sharePrice', direction: 'right', disablePadding: false, label: 'Share Price (USD)' },
  { id: 'chart', direction: 'center', disablePadding: true, label: 'Chart' },
];

function EnhancedTableHead(props) {
    // number of selected  
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

const sortTableComponent = (id, headCellName) => {
    return (<TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? order : 'asc'}
        onClick={createSortHandler(id)}
    >
        {headCellName}
        {orderBy === id ? (
        <span className={classes.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
        </span>
        ) : null}
    </TableSortLabel>)
}

  

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all symbols' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.direction}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            { headCell.id !== 'chart' ? (
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                    ) : null}
                </TableSortLabel>
                ) : headCell.label
            }

            {/* { headCell.id !== 'chart' ? 
                sortTableComponent(headCell.id, headCell.label) 
                : headCell.label
            } */}
            {/* make sortable */}
            {/* {headCell.id} */}

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;