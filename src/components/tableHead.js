import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {TableContext} from '../context/tableContext'
import IconButton from '@material-ui/core/IconButton';

function EnhancedTableHead(props) {
  const {rows, setRows, chartSwitch, setChartSwitch} = useContext(TableContext)
    // number of selected  
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    const headCells = [
      { id: 'symbol', direction: 'left', disablePadding: false, label: 'Stock Ticker',  sort: true},
      { id: 'stockChange', direction: 'right', disablePadding: false, label: 'Day Change', sort: true },
      { id: 'marketCap', direction: 'right', disablePadding: false, label: 'marketCap (USD) ', sort: true},
      { id: 'sharePrice', direction: 'right', disablePadding: false, label: 'Share Price (USD)',sort: true},
      { id: 'chart', direction: 'center', disablePadding: true, label: `${chartSwitch}`, sort: false },
      { id: 'link', direction: 'center', disablePadding: true, label: 'Info', sort: false}
    ];
  
  const onChangeChart = () => {
    if(chartSwitch == 'Spark Chart') {
      setChartSwitch('OHLC Chart')
    } else {
      setChartSwitch('Spark Chart')
    }
  }

  return (
    <TableHead style={{marginTop: '30px'}}>
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
            { headCell.sort ? (
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
                ) : headCell.id !== 'link' ? (<a onClick={onChangeChart}><IconButton color="primary" component="span">
                <i className="far fa-chart-bar"></i> 
              </IconButton> {headCell.label}</a>) : (
              <div>{headCell.label}</div>)
            }
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