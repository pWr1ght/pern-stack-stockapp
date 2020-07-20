import React, {useContext, useState, useEffect} from 'react';
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
import EnhancedTableHead from './tableHead'
import EnhancedTableToolbar from './tableToolBar'
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import GetStocks from '../api/getStocks'
import {rearangeData} from '../scripts/sortChartData';
import ViewInfo from './newInfo';
import StockArrow from './stockArrow';
import '../styles/tableStyle.css'
import ReactHover from 'react-hover'
import HoverSymbol from './hoverSymbol';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));
  
const EnhancedTable = () => {
      const {rows, setRows, money, setMoney} = useContext(TableContext)
      
      const classes = useStyles();
      const [order, setOrder] = React.useState('asc');
      const [orderBy, setOrderBy] = React.useState('stockChange');
      const [selected, setSelected] = React.useState([]);
      const [page, setPage] = React.useState(0);
      const [dense, setDense] = React.useState(false);
      const [chartWidth, setChartWidth] =  React.useState(false);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [currentTicker, setCurrentTicker] = React.useState('');
      const [symbolError, setSymbolError] = React.useState(false)
     

      function abbreviateNumber(value) {
        let newValue = value;
        if (value >= 1000) {
            let suffixes = ["", "K", "M", "B","T"];
            let suffixNum = Math.floor( (""+value).length/3 );
            let shortValue = '';
            for (let precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
            newValue = shortValue+suffixes[suffixNum];
        }
        return newValue;
    }
      // function createData(symbol, stockChange, marketCap, sharePrice, chart) {
      //   return { symbol, stockChange, marketCap, sharePrice, chart};
      // }
       // the function that grabs the rows
       function createData(symbol, stockChange, marketCap, sharePrice, chart, financialData, imageInfo) {
        return { symbol, stockChange, marketCap, sharePrice, chart, financialData, imageInfo};
      }
      useEffect( () => {
        const fetchData = async () => {
            // console.log("hello")
            try{
                //initiate the date for to and from for api call
                const now = new Date().getTime()
                const current = parseInt(now/1000)
                const month = current - (86400 * 31)
    
                const stockResponse = await GetStocks.get('/', {
                    params:{ from: month, to: current}
                })
                const candleChartData = stockResponse.data[0];
                console.log(candleChartData)
                const totalCandleData = candleChartData
                    .map(element => rearangeData(element))
                console.log(totalCandleData)
                // let totalCandleData = []
                // candleChartData.forEach(element => {
                //     let oneCandle = rearangeData(element);
                //     totalCandleData.push(oneCandle);
                // })
                
                let formattedRows = totalCandleData.map(row => {
                  console.log(row)
                  return createData(row.symbol, row.priceChange, row.marketCap, row.currentPrice, {stockId: row.stockId, options: row.options, series: row.series}, row.yahooSummaryData, row.imageInfo)
                })

                // {diffDayChange: row.diffDayChange,
                //   currentPrice: row.currentPrice, dayPercChange: row.dayPercChange, oneYearData: row.oneYearData}
                console.log(formattedRows)
                // console.log(formattedRows)
                // setLoading(true)
                // const formattedRows = [[createData('BA', 305, 3.7, 67, 4.3)],
                // [createData('MA', 305, 3.7, 67, 4.3)]]
                // setRows((prevRows) => [...prevRows, ...[createData('AAPL', 452, 25.0, 51, 4.9)]])
                setRows(formattedRows);
                // setStockList(stockResponse.data[1])
                // setStocks(totalCandleData)
            } catch(err) {
                // console.log("thi is an error, ", err);
            }
        };
        fetchData()
    }, []);

      // function that descends the rows
      function descendingComparator(a, b, orderBy) {
          if (b[orderBy] < a[orderBy]) {
              return -1;
          }
          if (b[orderBy] > a[orderBy]) {
              return 1;
          }
          return 0;
      }
    
    
      //function that compares to descend
      function getComparator(order, orderBy) {
          return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }
  
  
      // the function that grabs the rows
      // function createData(symbol, stockChange, marketCap, sharePrice, chart, financialData) {
      //     return { symbol, stockChange, marketCap, sharePrice, chart, financialData};
      // }
  
      function stableSort(array, comparator) {
          const stabilizedThis = array.map((el, index) => [el, index]);
          stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
          });
          return stabilizedThis.map((el) => el[0]);
        }
      
      // the rows
      // const rows = [
      //     createData('BA', 305, 3.7, 67, 4.3),
      //     createData('Donut', 452, 25.0, 51, 4.9),
      //     createData('Eclair', 262, 16.0, 24, 6.0),
      //     createData('AAPL', 159, 6.0, 24, 4.0),
      //     createData('Gingerbread', 356, 16.0, 49, 3.9),
      //     createData('Honeycomb', 408, 3.2, 87, 6.5),
      //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      //     createData('Jelly Bean', 375, 0.0, 94, 0.0),
      //     createData('KitKat', 518, 26.0, 65, 7.0),
      //     createData('Lollipop', 392, 0.2, 98, 0.0),
      //     createData('Marshmallow', 318, 0, 81, 2.0),
      //     createData('Nougat', 360, 19.0, 9, 37.0),
      //     createData('Oreo', 437, 18.0, 63, 4.0),
      // ];
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.symbol);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, symbol) => {
      const selectedIndex = selected.indexOf(symbol);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, symbol);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };

    const handleChangeWidth = (event) => {
      setChartWidth(event.target.checked);
    };
  
    const onSubmitForm = async (event) => {
      event.preventDefault();

      // let now = new Date().getTime()
      // let current = parseInt(now/1000)
      // let month = current - (86400 * 31)
      // if(!rows.includes(currentTicker).trim())
      let submit = true;
      rows.map(row => {
        if((row.symbol) == currentTicker.trim()){
          submit = false;
        }
      })
      if(submit) {

        // setRows((prevRows) => [...prevRows, ...[createData(`${currentTicker}`, 452, 25.0, 51, 4.9)]])
        //call the backend
        let now = new Date().getTime()
        let current = parseInt(now/1000)
        let month = current - (86400 * 31)
        const response = await GetStocks.post('/', {
          user_id: '2',
          ticker: currentTicker,
          from: month,
          to: current
        })
        if(response.data.length == 0) {
          console.log("ticker not supported")
          setSymbolError(true)
          
        } else {
          setSymbolError(false)
          console.log(response.data)
          const responseData = rearangeData(response.data)
          console.log("adding", responseData)
          setRows((prevRows) => 
            [...prevRows,...[createData(`${currentTicker}`,
              responseData.priceChange,
              responseData.marketCap,
              responseData.currentPrice,
              {
              stockId: responseData.stockId,
              options: responseData.options,
              series: responseData.series
              },
              responseData.yahooSummaryData,
              responseData.imageInfo
              )
            ]])
        }
      }
      else {
        console.log("Already entered the stock")
      }
      // setRows((prevRows) => [...prevRows, ...[createData(`${currentTicker}`, 452, 25.0, 51, 4.9)]])
      // console.log(currentTicker)
      // alert('this is what you entered ' + currentTicker);
      setCurrentTicker('');
    }
  
    const isSelected = (symbol) => selected.indexOf(symbol) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
    const optionsCursorTrueWithMargin = {
      followCursor: true,
      shiftX: 10,
      shiftY: 0
    }
    return (
      
      <div className={classes.root}>
          <Container maxWidth="sm" className="text-center">
                {/* header */}
                <h1>Welcome to your stock portfolio</h1>
                    {/* input */}
                    <form onSubmit={onSubmitForm} noValidate autoComplete="off">
                        <div className="searchHeader">
                          {!symbolError ? (
                            <TextField id="standard-basic"
                              label="Please Enter your stock ticker"
                              text="text" className="form-control"
                              value={currentTicker} 
                              onChange={e => setCurrentTicker(e.target.value)}/>
                            ) : (
                              <TextField
                              error
                              className="form-control"
                              id="standard-error-helper-text"
                              label="Ticker not supported"
                              value={currentTicker} 
                              // helperText="Please enter another"
                              onChange={e => setCurrentTicker(e.target.value)}
                            />
                            ) 
                          }
                            <ButtonGroup
                                color="primary"
                                aria-label="contained primary button group"
                                variant="contained"
                            >
                            <Button color="primary" type="submit">Add</Button>
                            </ButtonGroup>
                        </div>
                    </form>
          </Container>
          {/* <form onSubmit={onSubmitForm} noValidate autoComplete="off">
              <FormControl>
                  <div style={{display: "flex"}}>
                      <TextField id="outlined-basic" value={currentTicker} label="Outlined" variant="outlined" onChange={e => setCurrentTicker(e.target.value)}/>
                      <Button type="submit">Add</Button>
                  </div>
              </FormControl>
          </form> */}
        {/* <Container style={{width: "100"}}disableGutters={false}> */}
        <Container maxWidth={chartWidth ? false : 'lg'}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar rows={rows} setSelected={setSelected} selected={selected} numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.symbol);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.symbol)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.symbol}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {/* <ReactHover
                            options={optionsCursorTrueWithMargin}>
                            <ReactHover.Trigger type='trigger'> */}
                            {/* <img style={{height: "40px", width: "40px"}} src={row.imageInfo.logo}></img> */}
                            <div style={{display:"flex"}}>
                              
                               <ReactHover
                                  options={optionsCursorTrueWithMargin}>
                                  <ReactHover.Trigger type='trigger'>
                                    <div><h2>{row.symbol}</h2></div>
                                    </ReactHover.Trigger>
                                <ReactHover.Hover type='hover'>
                                  <HoverSymbol image={row.imageInfo}/>
                                </ReactHover.Hover>
                              </ReactHover>
                            </div>
                            
                            {/* </ReactHover.Trigger>
                            <ReactHover.Hover type='hover'>
                              <HoverSymbol/>
                            </ReactHover.Hover>
                          </ReactHover> */}
                        </TableCell>
                        {/* {row.stockChange} */}
                        <TableCell align="right"><StockArrow dollarChange={row.financialData.regularMarketChange} percentageChange={row.financialData.regularMarketChangePercent}/></TableCell>
                        <TableCell align="right">{abbreviateNumber(row.marketCap)}</TableCell>
                        <TableCell align="right">{row.sharePrice}</TableCell>
                        <TableCell className="expand-trigger" align="right">
                          <ViewInfo data={row.chart}
                                    id={row.chart.stockId}
                                    name={row.symbol}>
                                    </ViewInfo>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        </Container>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Decrease Chart Spacing"
        />
         <FormControlLabel
          control={<Switch checked={chartWidth} onChange={handleChangeWidth} />}
          label="Increase Chart Width"
        />
      </div>
    );
  }
  
  export default EnhancedTable;