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
import { useEffect, useContext, useState } from "react";
import { AuthContext, UserDataContext } from "../../../App";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import {useCookies} from 'react-cookie';

// Generate Order Data
function createData(id, name,date, country, height, amount) {
  return {id, name, date, country, height, amount };
}


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));


export default function Actors() {
  const classes = useStyles();
  const [actorlist, setactorlist] = useState([]);
  
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [actor, setActor] = useState({});
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const [ActorId, setActorId] = useState("");
  const handleClickOpen = (row) => {
    setActor(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };


  const deleteActor = event =>{
    DeleteActor(actor)
    setOpen(false);
    // loadCards()
  }
  

  async function DeleteActor(data) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/actor/delete", {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    let delData = await response.json();
    setActorId(delData.id);
  }

  async function loadCards(){
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/actor/allActors", {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": bearer
        }
    });
    let tabledata = await response.json();
    console.log(tabledata)
    setactorlist(tabledata);
    setActorId("")
}
  useEffect(()=>{
      loadCards();
  }, [ActorId]);

    return (
      <>
      <React.Fragment>
        <Title>Actors</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Full name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actorlist.map((row) => (
              <TableRow key={row.id}>
                  
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.country.name}</TableCell>
              <TableCell align="right">
              <a href={`/admin/actors/${row.id}`}>
                <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                  >
                    <EditIcon/>
                 </Button>
                 </a>
            </TableCell>

              <TableCell onClick={() => {handleClickOpen(row)}}>
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
  
  <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {actor.full_name } delete?
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
        <Button onClick={deleteActor} color="secondary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </>
);
              }