import React, {useContext, useState, useEffect} from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {TableContext} from './../../../context/tableContext';
import EnhancedTableHead from './tableHead'
import EnhancedTableToolbar from './tableToolBar'
import Container from '@material-ui/core/Container';
import URLlink from '../../../backendLink/getBackendURL'
import {rearrangeData} from './../../../sortDataFunctions/sortChartData';
import ViewInfo from '../tableComponents/rowChart';
import StockArrow from '../../stockArrow';
import './../../../styles/tableStyle.css'
import './../../../styles/style.css'
import ReactHover from 'react-hover'
import HoverSymbol from '../tableComponents/hoverSymbol';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grow from '@material-ui/core/Grow';
import SearchHeader from '../headerSearch';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button'
import ViewMoreInfo from '../tableComponents/viewMoreInfo';
import MarketStatus from '../marketStatusBar'
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '100%',
      minHeight: "800px",
      // backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundImage: "radial-gradient(circle, #211f1f, #292626, #302d2f, #373437, #3d3c40, #414249, #444953, #45505c, #415869, #3a6074, #2d697e, #147287)",
      paddingBottom: "150px",
      zIndex: -99999,
      // position: "absolute",
    // top: "50px",
    bottom: 0
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
      border: "2px solid #0C6BA7",
    },
    LinearProgress: {
      width: "100%"
    },
    tableChart: {
      display:"flex",
      flexDirection:"column",

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
  // table section styling
  const classes = useStyles();

  // table states
  const {rows, setRows} = useContext(TableContext)
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('stockChange');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [chartWidth, setChartWidth] =  React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false)
     

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

  // the function that grabs the rows
  function createData(symbol, stockChange, marketCap, sharePrice, chart, financialData, imageInfo, stockId, abMarketCap) {
    return { symbol, stockChange, marketCap, sharePrice, chart, financialData, imageInfo, stockId, abMarketCap};
  }

  //populate each row with stock data
  useEffect( () => {
  let rowStorage = JSON.parse(localStorage.getItem('StockRows'))
  const fetchData = async () => {
      try{
          // initiate the date for to and from for finnhub api call
          const now = new Date().getTime()
          const current = parseInt(now/1000)
          const month = current - (86400 * 31)

          const stockSymbols = rowStorage.map(item => item.symbol)
          const totalStockInfoResponse = await URLlink.get('/getStockInfo', {
              params:{ list: stockSymbols, from: month, to: current}
          })

          //modify data for stock charts
          const totalModifiedStockData = totalStockInfoResponse.data[0]
              .map(element => rearrangeData(element))
          let formattedRows = totalModifiedStockData.map(row => {
            return createData(row.symbol, row.priceChange, row.marketCap, row.currentPrice, {stockId: row.stockId, options: row.options, series: row.series}, row.yahooSummaryData, row.imageInfo, row.stockId, abbreviateNumber(row.marketCap))
          })
          setLoading(true)
          setRows(formattedRows);
      } catch(err) {
          console.log("thi is an error, ", err);
      }
  };
    if(rowStorage && (rowStorage.length !== 0) ) {
      fetchData()
    } else {
      setLoading(true)
    }
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

  //compare and sort incoming array
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  //detect if ascending or descenting and selects sort method
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

  const isSelected = (symbol) => selected.indexOf(symbol) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
  const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 10,
    shiftY: -100,
  }

  return (  
    <div className={classes.root}>
      <MarketStatus/>
      <Container maxWidth={chartWidth ? false : 'lg'}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            rows={rows}
            setSelected={setSelected}
            selected={selected}
            numSelected={selected.length}
          />
          {loading ? (false) : (
            <div className="loadingTable">
              <LinearProgress className={classes.LinearProgress} />
            </div>)}
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
                        // animations for populating rows
                        <Grow
                          in={true}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(rows ? { timeout: 1000 } : [])}
                        > 
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.symbol)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={uuidv4()}
                            selected={isItemSelected}
                          >
                            <TableCell  key={uuidv4()} padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>
                            <TableCell align="center" key={uuidv4()} component="th" id={labelId} scope="row" padding="none">
                                <div className={classes.tableChart}>
                                  <ReactHover
                                      options={optionsCursorTrueWithMargin}>
                                      <ReactHover.Trigger type='trigger'>
                                        <div><h3>{row.symbol.toUpperCase()}</h3></div>
                                      </ReactHover.Trigger>
                                      
                                      <ReactHover.Hover type='hover'>
                                      
                                        <HoverSymbol image={row.imageInfo}/>
                                      </ReactHover.Hover>
                                  </ReactHover>
                                </div>
                            </TableCell>
                            <TableCell  key={uuidv4()} align="right"><StockArrow break={true} dollarChange={row.financialData.regularMarketChange} percentageChange={row.financialData.regularMarketChangePercent}/></TableCell>
                            <TableCell  key={uuidv4()} align="right">{abbreviateNumber(row.marketCap)}</TableCell>
                            <TableCell  key={uuidv4()} align="right">{row.sharePrice}</TableCell>
                            <TableCell  key={uuidv4()} className="expand-trigger" align="right">
                              <ViewInfo
                                key={uuidv4()}
                                row={row} 
                                data={row.chart}
                                id={row.chart.stockId}
                                name={row.symbol}
                                abbreviatedMarketCap = {abbreviateNumber(row.marketCap)}
                                financialData={row.financialData}
                              >
                            </ViewInfo>
                            </TableCell>
                            <TableCell key={uuidv4()} className="expand-trigger" align="right">
                              <ViewMoreInfo 
                                key={uuidv4()}
                                row={row} 
                                data={row.chart}
                                id={row.chart.stockId}
                                name={row.symbol}
                                abbreviatedMarketCap = {abbreviateNumber(row.marketCap)}
                                financialData={row.financialData}
                              />
                            </TableCell>
                          </TableRow>
                        </Grow>
                      );
                    })
                }
                {emptyRows > 0 && (
                  <TableRow key={uuidv4()} style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <TablePagination
              key={uuidv4()}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </Paper>
      </Container>
      <Container className="tableFormControl">
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Decrease Chart Spacing"
        />
        <FormControlLabel
          control={<Switch checked={chartWidth} onChange={handleChangeWidth} />}
          label="Increase Chart Width"
        />
      </Container>
    </div>
  );
}
  
export default EnhancedTable;