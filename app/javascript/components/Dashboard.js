import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import Chart from './Chart';
import SelectedCurrency from './SelectedCurrency';
import CurrentPortfolio from './CurrentPortfolio';

import SearchBar from "material-ui-search-bar";
import Search from "./Search";
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  title: {
    flexGrow: 1,
  },
  centeredContainer: {
    display: 'flex',
    justifyContent: 'center',
    color: 'secondary',
  },
  loader: {
    marginTop: '100px',
    position: 'absolute',
    width: '100%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 270,
  },
}));

export default function Dashboard() {

  const [currentSearch, setCurrentSearch] = useState([]);
  const [currencyDetails, setCurrencyDetails] = useState({});
  const [recentPrices, setRecentPrices] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [currencyAmount, setCurrencyAmount] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const DEFAULT_CURRENCY_ID = 810; //Bitcoin

  const resetSearch = () => {
    setCurrentSearch([]);
    return;
  }
  const fetchCurrencyDetails = (currency_id) => {
    setLoaded(false);
    axios.post('./currency_details', {
      id: currency_id
    })
    .then( (response) => {
      setCurrencyDetails(response.data);
      resetSearch();
      setLoaded(true);
    })
    .catch( (error) => {
      alert(error.response.data.message);
      setLoaded(true);
    })
  }
  const handleChange = (e) => {
    const pattern = e.target.value;
    if (pattern.length == 0) resetSearch();
    axios.post('./search', { 
      pattern: pattern
    })
    .then( (response) => {
      setCurrentSearch(response.data)
    })
  }
  const handleClick = (e) => {
    resetSearch();
    const currency_id = e.target.getAttribute("data-id");
    fetchCurrencyDetails(currency_id);
  }

  const createPortfolioItem = () => {
    return {
      name: currencyDetails.name,
      img: currencyDetails.img,
      amount: currencyAmount,
      value: currencyAmount * currencyDetails.price,
      price: currencyDetails.price,
      percentage: 0,
    }
  }

  const consolidatePortfolioBalances = (portfolio) => {
    const totalValue = totalPortfolioValue(portfolio);
    portfolio.forEach(item => {
      item.percentage = Number((item.value / totalValue * 100).toFixed(2));
    })
  }

  const addNewItem = (portfolio) => {
    const portfolio_item = createPortfolioItem();
    const duplicate_item = portfolio.find(item => item.name == portfolio_item.name);
    if (duplicate_item) {
      portfolio_item.amount += duplicate_item.amount;
      portfolio_item.value = Number((portfolio_item.amount * portfolio_item.price).toFixed(2));
      const index = portfolio.findIndex(item => item.name == portfolio_item.name);
      portfolio[index] = portfolio_item;
    } else {
      portfolio.push(portfolio_item)
    }
  }

  const totalPortfolioValue = (portfolio) => {
    return portfolio.reduce((sum, item) => sum + item.value, 0)
  }

  const handleAddToPortfolio = () => {
    const new_portfolio = [...portfolio]
    addNewItem(new_portfolio);
    setOpenDialog(false);
    consolidatePortfolioBalances(new_portfolio);
    setPortfolio(new_portfolio);
  }

  useEffect(() => {
    fetchCurrencyDetails(DEFAULT_CURRENCY_ID);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Crypto Portfolio
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer}>
          <Search
            onChange={ (e) => handleChange(e) }
            searchResults={currentSearch.currencies}
            onClick={ (e) => handleClick(e) }
          />
          {!(loaded) && (
            <div className={classes.loader}>
              <div className={classes.centeredContainer}>
                <CircularProgress color='secondary'/>
              </div>
            </div>
          )}
        </div>

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              {loaded && (
                <Paper className={fixedHeightPaper}>
                  <SelectedCurrency
                    setCurrencyAmount={setCurrencyAmount}
                    portfolio={portfolio}
                    setPortfolio={setPortfolio}
                    handleAddToPortfolio={handleAddToPortfolio}
                    details={currencyDetails}
                    setOpenDialog={setOpenDialog}
                    openDialog={openDialog}
                  />
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              {loaded && (
                <Paper className={fixedHeightPaper}>
                  <Chart market_data={currencyDetails.market_chart}/>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12}>
              {loaded && (
                <Paper className={classes.paper}>
                  <CurrentPortfolio 
                    portfolio={portfolio}
                    totalPortfolioValue={totalPortfolioValue(portfolio)}
                  />
                </Paper>
              )}
            </Grid>             
          </Grid>
        </Container>
      </main>
    </div>
  );
}


