import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export default function AddCurrencyDialog(props) {
  const currency = props.currencyDetails;

  console.log(currency);
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select Amount</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How much {currency.name} will you add?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="email"
            fullWidth
            onChange={(e) => {props.setAmount(parseFloat(e.target.value))}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleAddToPortfolio} color="primary">
            Add to Portfolio
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}