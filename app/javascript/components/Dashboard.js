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

import { mainListItems, secondaryListItems } from './listItems';
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
    paddingRight: 24, // keep right padding when drawer closed
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

/******************************************/
  const [currentSearch, setCurrentSearch] = useState([]);
  const [currencyDetails, setCurrencyDetails] = useState({});
  const [recentPrices, setRecentPrices] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
    console.log(currency_id);
    fetchCurrencyDetails(currency_id);
  }

  useEffect(() => {
    fetchCurrencyDetails(810); //Bitcoin Details
  }, []);
/******************************************/

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
            {/* SelectedCurrency */}
            <Grid item xs={12} md={4} lg={3}>
              {loaded && (
                <Paper className={fixedHeightPaper}>
                  <SelectedCurrency 
                    portfolio={portfolio}
                    setPortfolio={setPortfolio}
                    details={currencyDetails}
                  />
                </Paper>
              )}
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              {loaded && (
                <Paper className={fixedHeightPaper}>
                  <Chart market_data={currencyDetails.market_chart}/>
                </Paper>
              )}
            </Grid>
            {/* Current Portfolio */}
            <Grid item xs={12}>
              {loaded && (
                <Paper className={classes.paper}>
                  <CurrentPortfolio portfolio={portfolio}/>
                </Paper>
              )}
            </Grid>             
          </Grid>
        </Container>
      </main>
    </div>
  );
}


