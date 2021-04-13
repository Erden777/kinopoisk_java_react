import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// Generate Order Data
function createData(id, name,date, country, height, amount) {
  return {id, name, date, country, height, amount };
}

const rows = [
  createData(0,  'Elvis Presley',  '16 Mar, 2019', 'Tupelo, MS', 190),
  createData(1,  'Paul McCartney','16 Mar, 2019', 'London, UK', 185),
  createData(2, 'Tom Scholz', 'Boston, MA', '16 Mar, 2019',  140),
  createData(3,  'Michael Jackson', '16 Mar, 2019','Gary, IN', 160),
  createData(4,  'Bruce Springsteen',  '15 Mar, 2019','Long Branch, NJ', 195),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Genre() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Genre</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Full name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Height</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
                
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.height}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell align="right">
              <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                 <EditIcon/>
                 </Button>
            </TableCell>
              <TableCell> 
              <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                ><DeleteIcon/> 
                </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}