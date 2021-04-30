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
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import {Select as MuiSelect} from "@material-ui/core";

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


export default function Genre() {
  const classes = useStyles();
  const [genrelist, setgenrelist] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [genre, setGenre] = useState({});
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const [genreId, setgenreId] = useState("");
  const [newgenre, setnewgenre] = useState("");
  const[name, setname] = useState("")


  const NameChange = (event) => {
    setname(event.target.value);
  };  

 

  const handleClickOpen = (row) => {
    setGenre(row);
    setOpen(true);
  };



  const handleClickOpenAdd = (row) => {
    // setActor(row);
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };


  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };


  const deleteGenre = event =>{
    DeleteGenre(genre)
    setOpen(false);
    // loadCards()
  }

  const SaveActorSubmit = event =>{
    const data = {name:name}
    console.log(data)
    SaveGenre(data)
    setname("")
    setOpenAdd(false);
    // loadCards()
  }
  
  async function SaveGenre(data){
    console.log(data, 'data')
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/genre/saveGenre",{
        method:"POST",
        mode: "cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json",
            Authorization: bearer,
        },
        redirect:"follow",
        referrerPolicy:"no-referrer",
        body: JSON.stringify(data)
    });
    
    let res = await response.json();
    setgenreId(res.id);
} useEffect(()=>{
    }, [newgenre]);


  async function DeleteGenre(data) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/genre/delete", {
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
    setgenreId(delData.id);
  }


  async function loadCards(){
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/genre/allgenre", {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": bearer
        }
    });
    let tabledata = await response.json();
    console.log(tabledata)
    setgenrelist(tabledata);
    setgenreId("")
}
  useEffect(()=>{
      loadCards();
  }, [genreId]);


    return (
      <>
      <React.Fragment>
        <Title>Actors</Title>
        
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genrelist.map((row) => (
              <TableRow key={row.id}>
                  
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
              <TableCell align="right">
              <a href={`/admin/genre/${row.id}`}>
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
      
    </React.Fragment>
    <Button  variant="contained"
                  color="primary"
                  className={classes.submit} style={{"marginTop":"40px"}}
                  onClick={() => {handleClickOpenAdd()}}>
        <AddBoxIcon />
        </Button>
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
              {genre.name } delete?
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
        <Button onClick={deleteGenre} color="secondary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add Genre</DialogTitle>
        <DialogContent>
          <DialogContentText>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    id="text"
                    name="fullname"
                    onChange={NameChange}
                    value={name}
                    autoComplete="text"
                    autoFocus
                />
                
                
        
               
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
        <Button onClick={SaveActorSubmit} color="secondary">
            Save
          </Button>
          <Button onClick={handleCloseAdd} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

    </>
  );
}