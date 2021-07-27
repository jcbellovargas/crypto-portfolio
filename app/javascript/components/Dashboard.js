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

import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import SelectedCurrency from './SelectedCurrency';
import Orders from './Orders';

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
    height: 240,
  },
}));

export default function Dashboard() {

/******************************************/
  const [currentSearch, setCurrentSearch] = useState([]);
  const [currencyDetails, setCurrencyDetails] = useState({});
  
  const resetSearch = () => {
    setCurrentSearch([]);
    return;
  }
  const fetchCurrencyDetails = (currency_id) => {
    axios.post('./currency_details', {
      id: currency_id
    })
    .then( (response) => {
      setCurrencyDetails(response.data);
      resetSearch();
    })
    .catch( (error) => {
      console.log(error.response)
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
    const currency_id = e.target.getAttribute("data-id");
    console.log(currency_id);
    fetchCurrencyDetails(currency_id);
  }
/******************************************/

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  currencyDetails.name || fetchCurrencyDetails(810); //Bitcoin

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Crypto Portfolio
          </Typography>
        {/*SEARCH BAR*/}
        </Toolbar>

      </AppBar>

      <main className={classes.content}>
        <Search 
          onChange={ (e) => handleChange(e) } 
          searchResults={currentSearch.currencies}
          onClick={ (e) => handleClick(e) }
        />
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            {/* Recent SelectedCurrency */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <SelectedCurrency details={currencyDetails} />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Container>

      </main>
    </div>
  );
}