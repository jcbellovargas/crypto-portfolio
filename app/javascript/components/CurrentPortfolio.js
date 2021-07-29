import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  logo: {
    marginLeft: '0.7rem',
    maxHeight: '1.5rem',
    paddingTop: '0.3rem',
  },
  tableHead: {
     fontWeight: 'bold',
     color: '#3f51b5',
  }
}));

export default function CurrentPortfolio(props) {
  const classes = useStyles();
  const rows = props.portfolio;
  const displayTable = rows.length > 0;
  return (
    <React.Fragment>
      <Title>Current Portfolio</Title>
      {!(displayTable) && (
        <Typography color="textSecondary" className={classes.depositContext}>
          {"Your portfolio is empty."}
        </Typography>
      )}
      {displayTable && (
        <Table size="small" aria-label="simple table">
          <TableHead >
            <TableRow >
              <TableCell className={classes.tableHead}>Currency</TableCell>
              <TableCell className={classes.tableHead}>Price</TableCell>
              <TableCell className={classes.tableHead}>Amount</TableCell>
              <TableCell className={classes.tableHead}>%</TableCell>
              <TableCell className={classes.tableHead} align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.name}
                  <img className={classes.logo} src={row.img}/>
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.percentage}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

{/*      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>*/}
    </React.Fragment>
  );
}