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


export default function Actors() {
  const classes = useStyles();
  const [actorlist, setactorlist] = useState([]);
  
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [actor, setActor] = useState({});
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const [ActorId, setActorId] = useState("");
  const [allCountries, setallCountries] = useState([]);
  const[countryId, setcountryId] = useState("")
  const[fullname, setfullname] = useState("")
  const[age, setAge] = useState("")
  const[picture_url, setPicture_url] = useState("")
  const[newActor, setNewActor] = useState([])
  const PrictureChange = (event) => {
    setPicture_url(event.target.value);
  };  

  const fullnameChange = (event) => {
    setfullname(event.target.value);
  };  

  const AgeChange = (event) => {
    setAge(event.target.value);
  };  

  const handleClickOpen = (row) => {
    setActor(row);
    setOpen(true);
  };

  const handleChange = (event) => {
    setcountryId(event.target.value);
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


  const deleteActor = event =>{
    DeleteActor(actor)
    setOpen(false);
    // loadCards()
  }

  const SaveActorSubmit = event =>{
    const data = {full_name:fullname,picture_url: picture_url, age:age, country:countryId}
    console.log(data)
    SaveActor(data)
    setfullname("")
    setPicture_url("")
    setAge("")
    setOpenAdd(false);
    // loadCards()
  }
  
  async function SaveActor(data){
    console.log(data, 'data')
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/actor/saveActor",{
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
    setActorId(res.id);
} useEffect(()=>{
    }, [newActor]);


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
      getCountries()
  }, [ActorId]);


  async function getCountries(){
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/allcountries/",
    {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      });
    if(response.status==200){
        let countries = await response.json();
        console.log(countries)
        if (countries != undefined ){
            setallCountries(countries);
        }
    }
}

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

    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add Actor</DialogTitle>
        <DialogContent>
          <DialogContentText>
                
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Full name"
                    id="text"
                    name="fullname"
                    onChange={fullnameChange}
                    value={fullname}
                    autoComplete="text"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    label="Picture URL"
                    name="picture_url"
                    value={picture_url}
                    onChange={PrictureChange}
                    autoComplete="text"
                    autoFocus
                />
              
                <TextField
                    id="date"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Age"
                    type="text"
                    value={age}
                    onChange={AgeChange}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                
        <FormControl variant="outlined"
        className={classes.formControl}
        fullWidth
        >
              <InputLabel id="demo-simple-select-outlined-label">
                Country
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={countryId}
                onChange={handleChange}
                label="country"
              >
                {allCountries.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
               
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