import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Card} from 'react-bootstrap'
import Select from '@material-ui/core/Select'
import {useCookies} from 'react-cookie';
import { Link, NavLink, useParams} from "react-router-dom";
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    FormHelperText,
  } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditCountry() {
  let {countryID} = useParams();
  const classes = useStyles();
  const[id, setId] = useState(countryID);
  const[name, setname] = useState("")
  const[data, setdata] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const[newGenre, setnewGenre] = useState([])

  const NameChange = (event) => {
    setname(event.target.value);
  };  
  
  const SaveGenreSubmit = event =>{
    
    const genre = {id:data['id'], name : name}
    console.log(genre)
    SaveGenre(genre)
    // loadCards()
  };

  async function getGenre(id){
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/country/getCountry/"+id,
    {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      });
    if(response.status==200){
        let genreData = await response.json();
        setdata(genreData);
        setname(genreData.name)
        setnewGenre("")
    }
    setGenreId("")
}useEffect(()=>{
    getGenre(id);
}, []);

async function SaveGenre(data){
  console.log(data, 'data')
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
  const response = await fetch("http://localhost:8000/country/saveActor",{
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
      let genreData = await response.json();
      if(genreData.status==200){
        let genreData = await response.json();
        setdata(genreData);
        setname(genreData.name)
        setGenreId(genreData.id);
        setnewGenre(genreData['name'])
    }
    }useEffect(()=>{
          getGenre(id)
  }, [newGenre]); 



  return (
        <div className="row">
            <div className="col-md-11">
            <h3 style={{marginTop:"60px", marginLeft:"20px"}}>{data['name']}</h3>
                <form className={classes.form} noValidate>
                <h4 style={{marginTop:"30px"}}></h4>
                <form>
                <TextField
                    id="date"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                    type="text"
                    value={name}
                    onChange={NameChange}
                    className={classes.textField ," ml-3"}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />

                <Button
                    type="submit"
                    className="mt-4 ml-3"
                    variant="contained"
                    color="primary"
                    onClick={SaveGenreSubmit}
                >
                    Save
                </Button>
                </form>
                </form>
            </div>
            </div>
  );
}