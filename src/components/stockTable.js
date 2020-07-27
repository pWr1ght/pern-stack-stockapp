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
import {TextField, Button} from '@material-ui/core/'
import {TableContext} from '../context/tableContext';
import {StockListContext} from '../context/stockListContext';
import {StockPortfolioContext} from '../context/stockPortfolio';
import EnhancedTableHead from './tableHead'
import EnhancedTableToolbar from './tableToolBar'
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import GetStocks from '../api/getStocks'
import {rearangeData} from '../scripts/sortChartData';
import ViewInfo from './newInfo';
import StockArrow from './stockArrow';
import '../styles/tableStyle.css'
import '../styles/style.css'
import ReactHover from 'react-hover'
import HoverSymbol from './hoverSymbol';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      background: 'rgb(141,164,252)',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(1),
    },
    table: {
      minWidth: 750,
      border: "1px solid rgb(64,80,181);"
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
    const {stockList, setStockList, addStock, removeStock} = useContext(StockListContext);
    const {setPortfolio, portfolios, portfolioCount, addPortfolio, removePortfolio, portfolioCountUp, portfolioCountDown, totalPortFolioCount } = useContext(StockPortfolioContext)
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

    useEffect( () => {
      // let rowStorage = localStorage.getItem('StockRows')
      // if(rowStorage){
      //   setRows(JSON.parse(rowStorage))
      // }
      const fetchData = async () => {
          try{
              //initiate the date for to and from for api call
              const now = new Date().getTime()
              const current = parseInt(now/1000)
              const month = current - (86400 * 31)
              
              
              const totalStockInfoResponse = await GetStocks.get('/', {
                  params:{ from: month, to: current}
              })

              const totalModifiedStockData = totalStockInfoResponse.data[0]
                  .map(element => rearangeData(element))
              let formattedRows = totalModifiedStockData.map(row => {
                // console.log(row)
                return createData(row.symbol, row.priceChange, row.marketCap, row.currentPrice, {stockId: row.stockId, options: row.options, series: row.series}, row.yahooSummaryData, row.imageInfo, row.stockId, abbreviateNumber(row.marketCap))
              })
              setLoading(true)
              // let newRowStorage = JSON.stringify(formattedRows)
              // localStorage.setItem("StockRows", newRowStorage);
              setRows(formattedRows);
          } catch(err) {
              console.log("thi is an error, ", err);
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

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }

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
          
          // let specificArrayInObject = portfolios[portfolioCount]
          // specificArrayInObject.portfolio.push("APPL") 
          // setPortfolio((prevState) => [...prevState, { ...prevState[portfolioCount], portfolio: [...prevState[portfolioCount].portfolio, "AAPL"] }])
          // setPortfolio((prevState) => )
          // setPortfolio((prevState) => [...prevState, ...prevState[portfolioCount].portfolio])
          addStock(currentTicker, 1)
          setSymbolError(false)
          console.log(response.data)
          const responseData = rearangeData(response.data)
          console.log("adding", responseData)

          setPortfolio((prevData => 
            prevData.map(item => (item.portfolioNum == portfolioCount ?
               {...item, portfolio: [...item.portfolio,...[createData(`${currentTicker}`,
               responseData.priceChange,
               responseData.marketCap,
               responseData.currentPrice,
               {
               stockId: responseData.stockId,
               options: responseData.options,
               series: responseData.series
               },
               responseData.yahooSummaryData,
               responseData.imageInfo,
               responseData.stockId,
               abbreviateNumber(responseData.marketCap)
               )
             ]]} :
                item))))


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
              responseData.imageInfo,
              responseData.stockId,
              abbreviateNumber(responseData.marketCap)
              )
            ]]
          )

        }
      }
      else {
        console.log("Already entered the stock")
      }
      setCurrentTicker('');
    }
  
    const isSelected = (symbol) => selected.indexOf(symbol) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const showStorage = () =>
    {
      // let item = localStorage.getItem('stockList')
      // let parseItem = JSON.parse(item)
      console.log(stockList)
      // console.log(parseItem)
    }
    const optionsCursorTrueWithMargin = {
      followCursor: true,
      shiftX: 10,
      shiftY: 0
    }
    return (
      
      <div className={classes.root}>
        {/* <button onClick={showStorage}>findStorage</button> */}
            {/* header */}
          <div className="header">
            <button onClick={addPortfolio}>add Portfolio</button>
            <button onClick={portfolioCountDown}>down Portfolio</button>
            <button onClick={portfolioCountUp}>up Portfolio</button>
            <button onClick={() => console.log(portfolios.length)}>count Portfolio</button>
            <button onClick={showStorage}>showStorage</button>
            <Container className="header" maxWidth="sm" className="text-center">
              <h1 >Welcome to your stock portfolio</h1>
                  {/* input */}
                  <form onSubmit={onSubmitForm} noValidate autoComplete="off">
                      <div className="searchTool">
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
          </div>
          <Container maxWidth={chartWidth ? false : 'lg'}>
            <Paper className={classes.paper}>
              
              <EnhancedTableToolbar rows={rows} setSelected={setSelected} selected={selected} numSelected={selected.length} />
              {loading ? (false) : (
                <div className="loadingTable">
                  <LinearProgress style={{width: "100%"}} />
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
                          <Grow
                          in={rows}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(rows ? { timeout: 1000 } : [])}
                          >
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
                            </TableCell>
                            <TableCell align="right"><StockArrow break={true} dollarChange={row.financialData.regularMarketChange} percentageChange={row.financialData.regularMarketChangePercent}/></TableCell>
                            <TableCell align="right">{abbreviateNumber(row.marketCap)}</TableCell>
                            <TableCell align="right">{row.sharePrice}</TableCell>
                            <TableCell className="expand-trigger" align="right">
                              <ViewInfo
                                row={row} 
                                data={row.chart}
                                id={row.chart.stockId}
                                name={row.symbol}
                                abbreviatedMarketCap = {abbreviateNumber(row.marketCap)}
                                financialData={row.financialData}
                              >
                              </ViewInfo>
                            </TableCell>
                          </TableRow>
                          </Grow>
                        );
                      })
                  }
                  
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