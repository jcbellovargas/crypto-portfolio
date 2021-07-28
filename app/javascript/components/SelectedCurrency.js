import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
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
  const [open, setOpen] = useState(false);
  const [currencyAmount, setCurrencyAmount] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToPortfolio = () => {
    const portfolio_item = {
      name: details.name,
      img: details.img,
      amount: currencyAmount, 
      value: currencyAmount * details.price,
      price: details.price, 
      percentage: 0,
    };
    props.setPortfolio([...props.portfolio, portfolio_item]);
    setOpen(false);
  }

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
            ${details.price}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary" >
            {"Market Cap: "}
            <NumberFormat value={details.market_cap} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            {"Volume (24h): "}
            <NumberFormat value={details.volume} displayType={'text'} thousandSeparator={true} prefix={'$'} />
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
          open={open} 
          handleClose={handleClose} 
          currencyDetails={details}
          setAmount={setCurrencyAmount}
          handleAddToPortfolio={handleAddToPortfolio}
        />   
        
      </Grid>
    </React.Fragment>
  );
}