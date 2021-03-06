import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCurrencyDialog from './AddCurrencyDialog';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  portfolioButton: { marginTop: '10%'}
});

export default function SelectedCurrency(props) {
  const classes = useStyles();
  const details = props.details;
  const change_color = details.change_24h > 0 ? "green" : "red"

  const handleClickOpen = () => {
    props.setOpenDialog(true);
  };

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Title>{details.name}</Title>
        </Grid>
        <Grid item xs={8}>
          <img src={details.img} />
        </Grid>
        <Grid item xs={12}>
          <Typography component="p" variant="h4">
            ${details.price.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary" >
            {"Market Cap: $"+details.market_cap.toLocaleString()}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            {"Volume (24h): $"+details.volume.toLocaleString()}
          </Typography>
          <Typography color="primary" className={classes.depositContext} style={{color:change_color}}>
            Change (24h): {details.change_24h}%
          </Typography>
        </Grid>
        <Grid  item xs={12}>
          <Button 
            onClick={handleClickOpen}
            className={classes.portfolioButton}
            size="small"
            variant="contained"
            color="primary">
              Add to Portfolio
          </Button>
        </Grid>
        <AddCurrencyDialog
          open={props.openDialog}
          handleClose={handleClose} 
          currencyDetails={details}
          setAmount={props.setCurrencyAmount}
          handleAddToPortfolio={props.handleAddToPortfolio}
        />   
        
      </Grid>
    </React.Fragment>
  );
}